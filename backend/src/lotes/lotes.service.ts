import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Lote } from '../models/lote.model';

@Injectable()
export class LotesService {
  constructor(@InjectModel(Lote) private loteModel: typeof Lote) {}

  findAll() {
    return this.loteModel.findAll();
  }

  findOne(id: number) {
    return this.loteModel.findByPk(id);
  }

  create(data: Partial<Lote>) {
    return this.loteModel.create(data as any);
  }

  async update(id: number, data: Partial<Lote>) {
    await this.loteModel.update(data as any, { where: { id } });
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.loteModel.destroy({ where: { id } });
    return { deleted: true };
  }
}
