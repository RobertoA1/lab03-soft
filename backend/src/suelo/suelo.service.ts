import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Suelo } from '../models/suelo.model';

@Injectable()
export class SueloService {
  constructor(@InjectModel(Suelo) private sueloModel: typeof Suelo) {}

  findAll() {
    return this.sueloModel.findAll({ order: [['fecha', 'DESC']] });
  }

  findByLote(loteId: number) {
    return this.sueloModel.findAll({
      where: { loteId },
      order: [['fecha', 'ASC']],
    });
  }

  findLatestByLote(loteId: number) {
    return this.sueloModel.findOne({
      where: { loteId },
      order: [['fecha', 'DESC']],
    });
  }

  create(data: Partial<Suelo>) {
    return this.sueloModel.create(data as any);
  }

  async update(id: number, data: Partial<Suelo>) {
    await this.sueloModel.update(data as any, { where: { id } });
    return this.sueloModel.findByPk(id);
  }

  async remove(id: number) {
    await this.sueloModel.destroy({ where: { id } });
    return { deleted: true };
  }
}
