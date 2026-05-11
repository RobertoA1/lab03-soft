import { Injectable, BadRequestException, UnauthorizedException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { z } from 'zod';
import { Sensor, SensorTipo } from '../models/sensor.model';
import { ClimaService } from '../clima/clima.service';
import { SueloService } from '../suelo/suelo.service';
import { RiegoService } from '../riego/riego.service';
import { LotesService } from '../lotes/lotes.service';
import { AuthService } from '../auth/auth.service';

const SENSOR_AUDIENCE = 'sensor';

const climaPayload = z.object({
  fecha: z.string().optional(),
  tempMax: z.number(),
  tempMin: z.number(),
  precipitacion: z.number(),
  humedadRelativa: z.number(),
  radiacionSolar: z.number(),
  velocidadViento: z.number(),
}).strict();

const sueloPayload = z.object({
  fecha: z.string().optional(),
  humedad: z.number(),
  ph: z.number(),
  nitrogenoDisponible: z.number(),
  fosforoDisponible: z.number(),
  conductividadElectrica: z.number(),
}).strict();

const riegoPayload = z.object({
  fecha: z.string().optional(),
  tipoRiego: z.string(),
  volumenAplicadoL: z.number(),
  duracionHoras: z.number(),
  presionBar: z.number(),
}).strict();

const PAYLOAD_SCHEMAS: Record<SensorTipo, z.ZodTypeAny> = {
  clima: climaPayload,
  suelo: sueloPayload,
  riego: riegoPayload,
};

export interface CreateSensorInput {
  loteId: number;
  tipo: SensorTipo;
  fabricante: string;
  modelo: string;
  numeroSerie: string;
  firmware?: string;
  fechaInstalacion?: string;
  activo?: boolean;
}

@Injectable()
export class SensoresService {
  constructor(
    @InjectModel(Sensor) private sensorModel: typeof Sensor,
    private jwtService: JwtService,
    private climaService: ClimaService,
    private sueloService: SueloService,
    private riegoService: RiegoService,
    private lotesService: LotesService,
    private authService: AuthService,
  ) {}

  // ── Admin CRUD ──────────────────────────────────────────────────────────

  async findAll() {
    const sensores = await this.sensorModel.findAll({ order: [['id', 'ASC']] });
    return sensores.map((s) => this.maskToken(s));
  }

  async findOne(id: number) {
    const s = await this.sensorModel.findByPk(id);
    if (!s) throw new NotFoundException('Sensor no encontrado');
    return this.maskToken(s);
  }

  async create(input: CreateSensorInput) {
    const lote = await this.lotesService.findOne(input.loteId);
    if (!lote) throw new BadRequestException('Lote inexistente');

    const sensor = await this.sensorModel.create({
      loteId: input.loteId,
      tipo: input.tipo,
      fabricante: input.fabricante,
      modelo: input.modelo,
      numeroSerie: input.numeroSerie,
      firmware: input.firmware ?? null,
      fechaInstalacion: input.fechaInstalacion ?? null,
      activo: input.activo ?? true,
      token: 'pending',
    } as any);

    const token = this.signToken(sensor.id, sensor.tipo, sensor.loteId);
    await sensor.update({ token });
    return this.maskToken(sensor);
  }

  async update(id: number, data: Partial<CreateSensorInput>) {
    const sensor = await this.sensorModel.findByPk(id);
    if (!sensor) throw new NotFoundException('Sensor no encontrado');
    // tipo y loteId no se pueden cambiar para evitar revalidaciones de datos históricos
    const { tipo, loteId, ...rest } = data;
    await sensor.update(rest as any);
    return this.maskToken(sensor);
  }

  async remove(id: number) {
    await this.sensorModel.destroy({ where: { id } });
    return { deleted: true };
  }

  async regenerateToken(id: number) {
    const sensor = await this.sensorModel.findByPk(id);
    if (!sensor) throw new NotFoundException('Sensor no encontrado');
    const token = this.signToken(sensor.id, sensor.tipo, sensor.loteId);
    await sensor.update({ token });
    return { id: sensor.id, token };
  }

  /**
   * Reveals the token in plain text after re-checking the admin password.
   */
  async revealToken(id: number, adminEmail: string, adminPassword: string) {
    const user = await this.authService.validateUser(adminEmail, adminPassword);
    if (!user || user.role !== 'admin') {
      throw new ForbiddenException('Credenciales de administrador inválidas');
    }
    const sensor = await this.sensorModel.findByPk(id);
    if (!sensor) throw new NotFoundException('Sensor no encontrado');
    return { id: sensor.id, token: sensor.token };
  }

  // ── Public ingestion (POST /webhooks/sensores/datos) ────────────────────

  async ingest(body: { sensorId: unknown; token: unknown; data: unknown }) {
    const { sensorId, token, data } = body ?? ({} as any);

    if (typeof sensorId !== 'number' || !Number.isInteger(sensorId)) {
      throw new BadRequestException('sensorId inválido');
    }
    if (typeof token !== 'string' || token.length === 0) {
      throw new BadRequestException('token inválido');
    }
    if (!data || typeof data !== 'object') {
      throw new BadRequestException('data inválida');
    }

    // 1. Verificar firma JWT
    let payload: any;
    try {
      payload = this.jwtService.verify(token, { audience: SENSOR_AUDIENCE });
    } catch {
      throw new UnauthorizedException('Token JWT inválido o expirado');
    }
    if (payload?.sub !== sensorId) {
      throw new UnauthorizedException('Token no corresponde al sensor');
    }

    // 2. Sensor debe existir, estar activo y el token debe coincidir con el guardado
    const sensor = await this.sensorModel.findByPk(sensorId);
    if (!sensor) throw new UnauthorizedException('Sensor desconocido');
    if (!sensor.activo) throw new ForbiddenException('Sensor inactivo');
    if (sensor.token !== token) {
      throw new UnauthorizedException('Token revocado');
    }

    // 3. Validar payload según tipo. .strict() rechaza cualquier campo extra
    //    (por ejemplo, un intento de inyectar loteId queda denegado).
    const schema = PAYLOAD_SCHEMAS[sensor.tipo];
    if (!schema) throw new BadRequestException('Tipo de sensor no soportado');
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      throw new BadRequestException({
        message: 'Datos no coinciden con el tipo de sensor',
        issues: parsed.error.issues,
      });
    }
    const clean = parsed.data as any;
    const fecha = clean.fecha ?? new Date().toISOString().split('T')[0];

    // 4. Insertar SOLO en la tabla del tipo del sensor, usando loteId del sensor.
    if (sensor.tipo === 'clima') {
      const row = await this.climaService.create({
        loteId: sensor.loteId,
        fecha,
        tempMax: clean.tempMax,
        tempMin: clean.tempMin,
        precipitacion: clean.precipitacion,
        humedadRelativa: clean.humedadRelativa,
        radiacionSolar: clean.radiacionSolar,
        velocidadViento: clean.velocidadViento,
      } as any);
      return { ok: true, tipo: 'clima', id: row.id, loteId: sensor.loteId };
    }

    if (sensor.tipo === 'suelo') {
      const row = await this.sueloService.create({
        loteId: sensor.loteId,
        fecha,
        humedad: clean.humedad,
        ph: clean.ph,
        nitrogenoDisponible: clean.nitrogenoDisponible,
        fosforoDisponible: clean.fosforoDisponible,
        conductividadElectrica: clean.conductividadElectrica,
      } as any);
      return { ok: true, tipo: 'suelo', id: row.id, loteId: sensor.loteId };
    }

    // riego
    const row = await this.riegoService.create({
      loteId: sensor.loteId,
      fecha,
      tipoRiego: clean.tipoRiego,
      volumenAplicadoL: clean.volumenAplicadoL,
      duracionHoras: clean.duracionHoras,
      presionBar: clean.presionBar,
    } as any);
    return { ok: true, tipo: 'riego', id: row.id, loteId: sensor.loteId };
  }

  // ── Helpers ─────────────────────────────────────────────────────────────

  private signToken(sensorId: number, tipo: SensorTipo, loteId: number) {
    // No expiration: sensores son dispositivos físicos; admin puede regenerar manualmente.
    return this.jwtService.sign(
      { sub: sensorId, tipo, loteId },
      { audience: SENSOR_AUDIENCE, noTimestamp: false, expiresIn: '3650d' },
    );
  }

  private maskToken(sensor: Sensor) {
    const json = sensor.toJSON() as any;
    const t: string = json.token ?? '';
    // tail = últimos 4 caracteres para que el admin reconozca el sensor sin ver el token completo
    json.tokenMasked = t ? `••••${t.slice(-4)}` : '';
    delete json.token;
    return json;
  }
}
