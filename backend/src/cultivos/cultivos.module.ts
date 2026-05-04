import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cultivo } from '../models/cultivo.model';
import { CultivosService } from './cultivos.service';

@Module({
  imports: [SequelizeModule.forFeature([Cultivo])],
  providers: [CultivosService],
  exports: [CultivosService],
})
export class CultivosModule {}
