import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Produccion } from '../models/produccion.model';
import { ProduccionService } from './produccion.service';

@Module({
  imports: [SequelizeModule.forFeature([Produccion])],
  providers: [ProduccionService],
  exports: [ProduccionService],
})
export class ProduccionModule {}
