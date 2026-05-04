import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Lote } from '../models/lote.model';
import { LotesService } from './lotes.service';

@Module({
  imports: [SequelizeModule.forFeature([Lote])],
  providers: [LotesService],
  exports: [LotesService],
})
export class LotesModule {}
