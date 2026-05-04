import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Lote } from '../models/lote.model';
import { Cultivo } from '../models/cultivo.model';
import { Clima } from '../models/clima.model';
import { Suelo } from '../models/suelo.model';
import { Riego } from '../models/riego.model';
import { Produccion } from '../models/produccion.model';
import { Alerta } from '../models/alerta.model';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectModel(Lote) private loteModel: typeof Lote,
    @InjectModel(Cultivo) private cultivoModel: typeof Cultivo,
    @InjectModel(Clima) private climaModel: typeof Clima,
    @InjectModel(Suelo) private sueloModel: typeof Suelo,
    @InjectModel(Riego) private riegoModel: typeof Riego,
    @InjectModel(Produccion) private produccionModel: typeof Produccion,
    @InjectModel(Alerta) private alertaModel: typeof Alerta,
  ) {}

  async seed() {
    const count = await this.loteModel.count();
    if (count > 0) {
      this.logger.log('Seed already applied, skipping.');
      return;
    }

    this.logger.log('Applying seed data...');

    const lotes = await this.loteModel.bulkCreate([
      { nombre: 'Lote Norte', superficieHa: 45.0, cultivo: 'Soja', ubicacion: 'Sector Norte - Parcela A' },
      { nombre: 'Lote Sur', superficieHa: 38.5, cultivo: 'Maíz', ubicacion: 'Sector Sur - Parcela B' },
      { nombre: 'Lote Este', superficieHa: 52.0, cultivo: 'Trigo', ubicacion: 'Sector Este - Parcela C' },
    ]);

    const [loteNorte, loteSur, loteEste] = lotes;

    await this.cultivoModel.bulkCreate([
      { nombre: 'Soja', variedad: 'DM 4612', fechaSiembra: '2024-11-15', fechaCosechaEst: '2025-04-10', loteId: loteNorte.id, temporada: '2024/25', superficieHa: 45.0 },
      { nombre: 'Maíz', variedad: 'DK 7110', fechaSiembra: '2024-10-20', fechaCosechaEst: '2025-03-15', loteId: loteSur.id, temporada: '2024/25', superficieHa: 38.5 },
      { nombre: 'Trigo', variedad: 'Klein Prometeo', fechaSiembra: '2024-06-01', fechaCosechaEst: '2024-11-30', loteId: loteEste.id, temporada: '2024', superficieHa: 52.0 },
      { nombre: 'Soja', variedad: 'DM 4612', fechaSiembra: '2023-11-10', fechaCosechaEst: '2024-04-05', loteId: loteNorte.id, temporada: '2023/24', superficieHa: 45.0 },
    ]);

    const fechasClima = this.generarFechas('2025-01-01', 30);
    const climaNorte = fechasClima.map((fecha, i) => ({
      loteId: loteNorte.id,
      fecha,
      tempMax: 28 + Math.sin(i * 0.3) * 6 + (Math.random() - 0.5) * 4,
      tempMin: 16 + Math.sin(i * 0.3) * 4 + (Math.random() - 0.5) * 2,
      precipitacion: i % 7 === 0 ? 18 + Math.random() * 30 : Math.random() * 3,
      humedadRelativa: 60 + Math.sin(i * 0.2) * 20 + (Math.random() - 0.5) * 10,
      radiacionSolar: 18 + Math.cos(i * 0.15) * 5 + (Math.random() - 0.5) * 3,
      velocidadViento: 8 + (Math.random() - 0.5) * 6,
    }));
    await this.climaModel.bulkCreate(climaNorte);

    const climaSur = fechasClima.map((fecha, i) => ({
      loteId: loteSur.id,
      fecha,
      tempMax: 30 + Math.sin(i * 0.3) * 7 + (Math.random() - 0.5) * 4,
      tempMin: 17 + Math.sin(i * 0.3) * 4,
      precipitacion: i % 9 === 0 ? 25 + Math.random() * 40 : Math.random() * 2,
      humedadRelativa: 55 + Math.sin(i * 0.2) * 15,
      radiacionSolar: 20 + Math.cos(i * 0.15) * 4,
      velocidadViento: 10 + (Math.random() - 0.5) * 5,
    }));
    await this.climaModel.bulkCreate(climaSur);

    await this.sueloModel.bulkCreate([
      { loteId: loteNorte.id, fecha: '2025-01-05', humedad: 42.0, ph: 6.5, nitrogenoDisponible: 28.0, fosforoDisponible: 18.0, conductividadElectrica: 0.35 },
      { loteId: loteNorte.id, fecha: '2025-01-15', humedad: 38.5, ph: 6.4, nitrogenoDisponible: 25.0, fosforoDisponible: 17.0, conductividadElectrica: 0.38 },
      { loteId: loteNorte.id, fecha: '2025-01-25', humedad: 31.2, ph: 6.3, nitrogenoDisponible: 22.0, fosforoDisponible: 15.5, conductividadElectrica: 0.42 },
      { loteId: loteSur.id, fecha: '2025-01-05', humedad: 55.0, ph: 7.8, nitrogenoDisponible: 32.0, fosforoDisponible: 22.0, conductividadElectrica: 0.45 },
      { loteId: loteSur.id, fecha: '2025-01-20', humedad: 48.0, ph: 7.6, nitrogenoDisponible: 30.0, fosforoDisponible: 20.0, conductividadElectrica: 0.48 },
      { loteId: loteEste.id, fecha: '2025-01-10', humedad: 62.0, ph: 6.8, nitrogenoDisponible: 35.0, fosforoDisponible: 24.0, conductividadElectrica: 0.30 },
    ]);

    await this.riegoModel.bulkCreate([
      { loteId: loteNorte.id, fecha: '2025-01-08', tipoRiego: 'Goteo', volumenAplicadoL: 12500, duracionHoras: 4.5, presionBar: 1.2 },
      { loteId: loteNorte.id, fecha: '2025-01-16', tipoRiego: 'Goteo', volumenAplicadoL: 14000, duracionHoras: 5.0, presionBar: 1.2 },
      { loteId: loteNorte.id, fecha: '2025-01-26', tipoRiego: 'Aspersión', volumenAplicadoL: 18000, duracionHoras: 3.0, presionBar: 2.5 },
      { loteId: loteSur.id, fecha: '2025-01-10', tipoRiego: 'Pivote Central', volumenAplicadoL: 38500, duracionHoras: 8.0, presionBar: 3.5 },
      { loteId: loteEste.id, fecha: '2025-01-12', tipoRiego: 'Gravedad', volumenAplicadoL: 52000, duracionHoras: 12.0, presionBar: 0.5 },
    ]);

    await this.produccionModel.bulkCreate([
      { cultivoId: 1, loteId: loteNorte.id, temporada: '2023/24', rendimientoTnHa: 3.8, calidadGrano: 'Buena', costosOperativos: 185000, ingresosBrutos: 310000, observaciones: 'Campaña con déficit hídrico en enero' },
      { cultivoId: 2, loteId: loteSur.id, temporada: '2023/24', rendimientoTnHa: 9.2, calidadGrano: 'Muy Buena', costosOperativos: 220000, ingresosBrutos: 420000, observaciones: 'Excelente respuesta a fertilización' },
      { cultivoId: 3, loteId: loteEste.id, temporada: '2024', rendimientoTnHa: 4.5, calidadGrano: 'Buena', costosOperativos: 160000, ingresosBrutos: 260000, observaciones: null },
      { cultivoId: 4, loteId: loteNorte.id, temporada: '2022/23', rendimientoTnHa: 4.1, calidadGrano: 'Muy Buena', costosOperativos: 170000, ingresosBrutos: 295000, observaciones: 'Campaña normal sin anomalías' },
    ]);

    const hoy = new Date().toISOString().split('T')[0];
    await this.alertaModel.bulkCreate([
      {
        tipo: 'humedad-baja',
        severidad: 'alta',
        categoria: 'hidrico',
        mensaje: 'Humedad de suelo en Lote Norte: 31.2% (umbral: 35%)',
        racional: 'Última lectura de suelo muestra humedad por debajo del umbral crítico para soja en etapa de llenado de granos.',
        recomendacion: 'Aplicar riego de 15-20 mm en las próximas 24-48 hs.',
        confianza: 0.92,
        loteId: loteNorte.id,
        fecha: hoy,
        estado: 'pendiente',
      },
      {
        tipo: 'ph-alcalino',
        severidad: 'media',
        categoria: 'quimico',
        mensaje: 'pH alcalino en Lote Sur: 7.8 (rango óptimo: 6.0–7.5)',
        racional: 'pH elevado reduce absorción de micronutrientes, especialmente Fe y Mn.',
        recomendacion: 'Considerar aplicación de azufre elemental 50-100 kg/ha.',
        confianza: 0.85,
        loteId: loteSur.id,
        fecha: hoy,
        estado: 'pendiente',
      },
      {
        tipo: 'rendimiento-bajo-pred',
        severidad: 'alta',
        categoria: 'predictivo',
        mensaje: 'Rendimiento de soja cayó 7.3% vs temporada anterior (4.1 → 3.8 tn/ha)',
        racional: 'Modelo detecta tendencia negativa en Lote Norte. Posible correlación con reducción de humedad de suelo.',
        recomendacion: 'Revisar plan de fertilización y manejo hídrico para la temporada actual.',
        confianza: 0.78,
        loteId: loteNorte.id,
        fecha: hoy,
        estado: 'reconocida',
      },
    ]);

    this.logger.log('Seed data applied successfully.');
  }

  private generarFechas(desde: string, dias: number): string[] {
    const fechas: string[] = [];
    const inicio = new Date(desde);
    for (let i = 0; i < dias; i++) {
      const d = new Date(inicio);
      d.setDate(d.getDate() + i);
      fechas.push(d.toISOString().split('T')[0]);
    }
    return fechas;
  }
}
