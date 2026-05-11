import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AlertasService } from '../alertas/alertas.service';
import { AlertasEventsService } from '../alertas/alertas-events.service';
import { NotificationConfigService } from '../notification-config/notification-config.service';

class N8nAlertaDto {
  tipo: string;
  severidad: 'critica' | 'alta' | 'media' | 'baja';
  mensaje: string;
  racional?: string;
  recomendacion?: string;
  confianza?: number;
  categoria?: 'hidrico' | 'quimico' | 'climatico' | 'predictivo';
  loteId?: number;
  fecha?: string;
}

@Controller('webhooks/n8n')
export class WebhooksController {
  constructor(
    private alertasService: AlertasService,
    private events: AlertasEventsService,
    private notificationConfig: NotificationConfigService,
  ) { }

  @Post('alertas')
  @HttpCode(202)
  async receiveAlert(@Body() body: N8nAlertaDto) {
    console.log('[Webhook n8n] Raw body type:', typeof body);
    console.log('[Webhook n8n] Raw body:', JSON.stringify(body).substring(0, 500));

    // Normalize: handle string, nested, or flat object
    let dto: any = body;
    if (typeof dto === 'string') {
      try { dto = JSON.parse(dto); } catch { /* keep as-is */ }
    }
    // n8n sometimes wraps in { json: { ... } }
    if (dto && dto.json && typeof dto.json === 'object') {
      dto = dto.json;
    }

    console.log('[Webhook n8n] Parsed dto:', JSON.stringify(dto));

    const alertaData = {
      tipo: dto?.tipo ?? null,
      severidad: dto?.severidad ?? 'media',
      mensaje: dto?.mensaje ?? null,
      racional: dto?.racional ?? '',
      recomendacion: dto?.recomendacion ?? '',
      confianza: dto?.confianza ?? 0.8,
      categoria: dto?.categoria ?? 'climatico',
      loteId: dto?.loteId ?? null,
      fecha: dto?.fecha || new Date().toISOString().split('T')[0],
    };

    const alerta = await this.alertasService.create({
      ...alertaData,
      estado: 'pendiente',
    } as any);

    // Destinatarios configurados por el agrónomo para que n8n envíe
    // notificaciones (EmailJS / Evolution API) en la misma respuesta.
    const cfg = await this.notificationConfig.get();

    return {
      received: true,
      alertaId: alerta.id,
      email: cfg.email ?? '',
      telefono: cfg.telefono ?? '',
      data: body,
    };
  }
}
