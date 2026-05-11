import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sensor } from '../models/sensor.model';
import { SensoresService } from './sensores.service';
import { SensoresController } from './sensores.controller';
import { ClimaModule } from '../clima/clima.module';
import { SueloModule } from '../suelo/suelo.module';
import { RiegoModule } from '../riego/riego.module';
import { LotesModule } from '../lotes/lotes.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Sensor]),
    ClimaModule,
    SueloModule,
    RiegoModule,
    LotesModule,
    AuthModule,
  ],
  providers: [SensoresService],
  controllers: [SensoresController],
  exports: [SensoresService],
})
export class SensoresModule {}
