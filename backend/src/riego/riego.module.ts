import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Riego } from '../models/riego.model';
import { RiegoService } from './riego.service';

@Module({
  imports: [SequelizeModule.forFeature([Riego])],
  providers: [RiegoService],
  exports: [RiegoService],
})
export class RiegoModule {}
