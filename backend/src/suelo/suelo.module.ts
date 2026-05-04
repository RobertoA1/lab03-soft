import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Suelo } from '../models/suelo.model';
import { SueloService } from './suelo.service';

@Module({
  imports: [SequelizeModule.forFeature([Suelo])],
  providers: [SueloService],
  exports: [SueloService],
})
export class SueloModule {}
