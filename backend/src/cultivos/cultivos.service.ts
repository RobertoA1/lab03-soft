import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cultivo } from '../models/cultivo.model';
import { Lote } from '../models/lote.model';

@Injectable()
export class CultivosService {
  constructor(@InjectModel(Cultivo) private cultivoModel: typeof Cultivo) {}

  findAll() {
    return this.cultivoModel.findAll({ include: [Lote] });
  }

  findOne(id: number) {
    return this.cultivoModel.findByPk(id, { include: [Lote] });
  }

  create(data: Partial<Cultivo>) {
    return this.cultivoModel.create(data as any);
  }

  async update(id: number, data: Partial<Cultivo>) {
    await this.cultivoModel.update(data as any, { where: { id } });
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.cultivoModel.destroy({ where: { id } });
    return { deleted: true };
  }
}
