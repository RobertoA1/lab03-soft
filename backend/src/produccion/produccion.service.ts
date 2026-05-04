import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Produccion } from '../models/produccion.model';
import { Cultivo } from '../models/cultivo.model';
import { Lote } from '../models/lote.model';

@Injectable()
export class ProduccionService {
  constructor(@InjectModel(Produccion) private produccionModel: typeof Produccion) {}

  findAll() {
    return this.produccionModel.findAll({ include: [Cultivo, Lote] });
  }

  findByTemporada(temporada: string) {
    return this.produccionModel.findAll({
      where: { temporada },
      include: [Cultivo, Lote],
    });
  }

  findByLote(loteId: number) {
    return this.produccionModel.findAll({
      where: { loteId },
      include: [Cultivo],
      order: [['temporada', 'ASC']],
    });
  }

  create(data: Partial<Produccion>) {
    return this.produccionModel.create(data as any);
  }

  async update(id: number, data: Partial<Produccion>) {
    await this.produccionModel.update(data as any, { where: { id } });
    return this.produccionModel.findByPk(id);
  }

  async remove(id: number) {
    await this.produccionModel.destroy({ where: { id } });
    return { deleted: true };
  }
}
