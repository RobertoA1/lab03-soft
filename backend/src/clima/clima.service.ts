import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Clima } from '../models/clima.model';

@Injectable()
export class ClimaService {
  constructor(@InjectModel(Clima) private climaModel: typeof Clima) {}

  findAll() {
    return this.climaModel.findAll({ order: [['fecha', 'DESC']] });
  }

  findByLote(loteId: number) {
    return this.climaModel.findAll({
      where: { loteId },
      order: [['fecha', 'ASC']],
    });
  }

  create(data: Partial<Clima>) {
    return this.climaModel.create(data as any);
  }

  findRecent(loteId: number, days = 30) {
    const since = new Date();
    since.setDate(since.getDate() - days);
    return this.climaModel.findAll({
      where: { loteId, fecha: { [Op.gte]: since.toISOString().split('T')[0] } },
      order: [['fecha', 'ASC']],
    });
  }

  async update(id: number, data: Partial<Clima>) {
    await this.climaModel.update(data as any, { where: { id } });
    return this.climaModel.findByPk(id);
  }

  async remove(id: number) {
    await this.climaModel.destroy({ where: { id } });
    return { deleted: true };
  }
}
