import { Module } from '@nestjs/common';
import { WebhooksController } from './webhooks.controller';
import { AlertasModule } from '../alertas/alertas.module';
import { NotificationConfigModule } from '../notification-config/notification-config.module';

@Module({
  imports: [AlertasModule, NotificationConfigModule],
  controllers: [WebhooksController],
})
export class WebhooksModule {}
