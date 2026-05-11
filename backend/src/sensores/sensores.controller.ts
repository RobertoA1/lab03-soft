import { BadRequestException, Body, Controller, HttpCode, Logger, Post } from '@nestjs/common';
import { SensoresService } from './sensores.service';

@Controller('webhooks/sensores')
export class SensoresController {
  private readonly logger = new Logger(SensoresController.name);

  constructor(private sensoresService: SensoresService) {}

  /**
   * POST /webhooks/sensores/datos
   * Body: { sensorId: number, token: string, data: object }
   * - Verifica firma JWT del sensor.
   * - Verifica que el token coincida con el almacenado para sensorId.
   * - Verifica que el `data` cumpla el schema correspondiente al tipo del sensor.
   * - Inserta SOLO en la tabla (clima | suelo | riego) del tipo del sensor,
   *   usando el loteId del propio sensor (cualquier loteId en el body es ignorado).
   */
  @Post('datos')
  @HttpCode(201)
  async ingest(@Body() body: any) {
    const payload = this.normalizePayload(body);

    const rawId = payload?.sensorId;
    let sensorId: number | undefined;
    if (typeof rawId === 'number' && Number.isInteger(rawId)) {
      sensorId = rawId;
    } else if (typeof rawId === 'string' && /^\d+$/.test(rawId)) {
      sensorId = Number(rawId);
    }

    if (sensorId === undefined) {
      this.logger.warn(
        `sensorId inválido. typeof body=${typeof body}, keys=${body && typeof body === 'object' ? Object.keys(body).join(',') : 'n/a'}, rawId=${JSON.stringify(rawId)}, preview=${JSON.stringify(body).slice(0, 300)}`,
      );
      throw new BadRequestException(
        'sensorId inválido. El cuerpo debe ser JSON con { "sensorId": <number>, "token": "<jwt>", "data": { ... } } y Content-Type: application/json.',
      );
    }

    return this.sensoresService.ingest({
      sensorId,
      token: payload?.token,
      data: payload?.data,
    });
  }

  /**
   * Acepta el body tal cual lo envíe el cliente y devuelve un objeto plano
   * `{ sensorId, token, data }` aunque venga:
   * - como string JSON (algunos clientes mandan el body serializado);
   * - envuelto en `{ json: { ... } }` (típico de algunos nodos de n8n);
   * - dentro de un array `[{ ... }]`.
   */
  private normalizePayload(body: any): any {
    let p: any = body;
    if (typeof p === 'string') {
      try { p = JSON.parse(p); } catch { /* mantener original */ }
    }
    if (Array.isArray(p) && p.length > 0) p = p[0];
    if (p && typeof p === 'object' && p.json && typeof p.json === 'object') p = p.json;
    if (p && typeof p === 'object' && p.body && typeof p.body === 'object' && 'sensorId' in p.body) p = p.body;
    return p;
  }
}
