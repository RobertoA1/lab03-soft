import { Module } from '@nestjs/common';
import { WebhooksController } from './webhooks.controller';
import { AlertasModule } from '../alertas/alertas.module';

@Module({
  imports: [AlertasModule],
  controllers: [WebhooksController],
})
export class WebhooksModule {}
