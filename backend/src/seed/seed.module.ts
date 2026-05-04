import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Lote } from '../models/lote.model';
import { Cultivo } from '../models/cultivo.model';
import { Clima } from '../models/clima.model';
import { Suelo } from '../models/suelo.model';
import { Riego } from '../models/riego.model';
import { Produccion } from '../models/produccion.model';
import { Alerta } from '../models/alerta.model';
import { SeedService } from './seed.service';

@Module({
  imports: [SequelizeModule.forFeature([Lote, Cultivo, Clima, Suelo, Riego, Produccion, Alerta])],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
