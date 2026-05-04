import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Riego } from '../models/riego.model';

@Injectable()
export class RiegoService {
  constructor(@InjectModel(Riego) private riegoModel: typeof Riego) {}

  findAll() {
    return this.riegoModel.findAll({ order: [['fecha', 'DESC']] });
  }

  findByLote(loteId: number) {
    return this.riegoModel.findAll({
      where: { loteId },
      order: [['fecha', 'ASC']],
    });
  }

  create(data: Partial<Riego>) {
    return this.riegoModel.create(data as any);
  }

  async update(id: number, data: Partial<Riego>) {
    await this.riegoModel.update(data as any, { where: { id } });
    return this.riegoModel.findByPk(id);
  }

  async remove(id: number) {
    await this.riegoModel.destroy({ where: { id } });
    return { deleted: true };
  }
}
