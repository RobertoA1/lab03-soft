import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Alerta } from '../models/alerta.model';
import { Lote } from '../models/lote.model';
import { AlertasEventsService } from './alertas-events.service';

@Injectable()
export class AlertasService {
  constructor(
    @InjectModel(Alerta) private alertaModel: typeof Alerta,
    private events: AlertasEventsService,
  ) {}

  findAll() {
    return this.alertaModel.findAll({ include: [{ model: Lote, attributes: ['id', 'nombre'] }], order: [['fecha', 'DESC']] });
  }

  findPendientes() {
    return this.alertaModel.findAll({ where: { estado: 'pendiente' }, include: [{ model: Lote, attributes: ['id', 'nombre'] }], order: [['fecha', 'DESC']] });
  }

  async create(data: Partial<Alerta>) {
    const alerta = await this.alertaModel.create(data as any);
    this.events.emit(alerta);
    return alerta;
  }

  async acknowledge(id: number) {
    await this.alertaModel.update({ estado: 'reconocida' }, { where: { id } });
    return this.alertaModel.findByPk(id);
  }

  async resolve(id: number, notaResolucion?: string) {
    await this.alertaModel.update(
      { estado: 'resuelta', notaResolucion: notaResolucion ?? null },
      { where: { id } },
    );
    return this.alertaModel.findByPk(id);
  }

  async update(id: number, data: Partial<Alerta>) {
    await this.alertaModel.update(data as any, { where: { id } });
    return this.alertaModel.findByPk(id);
  }

  async remove(id: number) {
    await this.alertaModel.destroy({ where: { id } });
    return { deleted: true };
  }

  async upsertByHash(hash: string, data: Partial<Alerta>) {
    const existing = await this.alertaModel.findOne({ where: { tipo: data.tipo, loteId: data.loteId, fecha: data.fecha } });
    if (!existing) {
      const alerta = await this.alertaModel.create(data as any);
      this.events.emit(alerta);
      return alerta;
    }
    return existing;
  }
}
