import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { NotificationConfig } from '../models/notification-config.model';
import { NotificationConfigService } from './notification-config.service';

@Module({
  imports: [SequelizeModule.forFeature([NotificationConfig])],
  providers: [NotificationConfigService],
  exports: [NotificationConfigService],
})
export class NotificationConfigModule {}
