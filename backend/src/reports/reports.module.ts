import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { LotesModule } from '../lotes/lotes.module';
import { CultivosModule } from '../cultivos/cultivos.module';
import { ClimaModule } from '../clima/clima.module';
import { SueloModule } from '../suelo/suelo.module';
import { RiegoModule } from '../riego/riego.module';
import { ProduccionModule } from '../produccion/produccion.module';
import { AlertasModule } from '../alertas/alertas.module';

@Module({
  imports: [LotesModule, CultivosModule, ClimaModule, SueloModule, RiegoModule, ProduccionModule, AlertasModule],
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}
