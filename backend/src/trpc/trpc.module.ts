import { Module } from '@nestjs/common';
import { TrpcRouter } from './app.router';
import { LotesModule } from '../lotes/lotes.module';
import { CultivosModule } from '../cultivos/cultivos.module';
import { ClimaModule } from '../clima/clima.module';
import { SueloModule } from '../suelo/suelo.module';
import { RiegoModule } from '../riego/riego.module';
import { ProduccionModule } from '../produccion/produccion.module';
import { AlertasModule } from '../alertas/alertas.module';
import { AuthModule } from '../auth/auth.module';
import { ReportsModule } from '../reports/reports.module';
import { MlModule } from '../ml/ml.module';

@Module({
  imports: [LotesModule, CultivosModule, ClimaModule, SueloModule, RiegoModule, ProduccionModule, AlertasModule, AuthModule, ReportsModule, MlModule],
  providers: [TrpcRouter],
  exports: [TrpcRouter],
})
export class TrpcModule {}
