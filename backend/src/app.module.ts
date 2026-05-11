import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cultivo } from './models/cultivo.model';
import { Lote } from './models/lote.model';
import { Clima } from './models/clima.model';
import { Suelo } from './models/suelo.model';
import { Riego } from './models/riego.model';
import { Produccion } from './models/produccion.model';
import { Alerta } from './models/alerta.model';
import { Sensor } from './models/sensor.model';
import { NotificationConfig } from './models/notification-config.model';
import { CultivosModule } from './cultivos/cultivos.module';
import { LotesModule } from './lotes/lotes.module';
import { ClimaModule } from './clima/clima.module';
import { SueloModule } from './suelo/suelo.module';
import { RiegoModule } from './riego/riego.module';
import { ProduccionModule } from './produccion/produccion.module';
import { AlertasModule } from './alertas/alertas.module';
import { SeedModule } from './seed/seed.module';
import { TrpcModule } from './trpc/trpc.module';
import { AuthModule } from './auth/auth.module';
import { ReportsModule } from './reports/reports.module';
import { MlModule } from './ml/ml.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import { SensoresModule } from './sensores/sensores.module';
import { NotificationConfigModule } from './notification-config/notification-config.module';
import { Dialect } from 'sequelize';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: process.env.DATABASE_DIALECT as Dialect || 'sqlite',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      storage: process.env.DATABASE_STORAGE || './agrotech.sqlite',
      models: [Cultivo, Lote, Clima, Suelo, Riego, Produccion, Alerta, Sensor, NotificationConfig],
      autoLoadModels: true,
      synchronize: true,
      logging: process.env.NODE_ENV === 'development' ? console.log : false,
    }),
    CultivosModule,
    LotesModule,
    ClimaModule,
    SueloModule,
    RiegoModule,
    ProduccionModule,
    AlertasModule,
    SeedModule,
    TrpcModule,
    AuthModule,
    ReportsModule,
    MlModule,
    WebhooksModule,
    SensoresModule,
    NotificationConfigModule,
  ],
})
export class AppModule {}
