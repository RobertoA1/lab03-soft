import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Clima } from '../models/clima.model';
import { ClimaService } from './clima.service';

@Module({
  imports: [SequelizeModule.forFeature([Clima])],
  providers: [ClimaService],
  exports: [ClimaService],
})
export class ClimaModule {}
