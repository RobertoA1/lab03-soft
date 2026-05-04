import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Alerta } from '../models/alerta.model';
import { AlertasService } from './alertas.service';
import { ReglasService } from './reglas.service';
import { AlertasEventsService } from './alertas-events.service';
import { AlertasSseController } from './alertas-sse.controller';

@Module({
  imports: [SequelizeModule.forFeature([Alerta])],
  controllers: [AlertasSseController],
  providers: [AlertasService, ReglasService, AlertasEventsService],
  exports: [AlertasService, ReglasService, AlertasEventsService],
})
export class AlertasModule {}
