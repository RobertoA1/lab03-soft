import { Controller, Sse, MessageEvent } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { AlertasEventsService } from './alertas-events.service';
import { Alerta } from '../models/alerta.model';

@Controller('alertas')
export class AlertasSseController {
  constructor(private alertEvents: AlertasEventsService) {}

  @Sse('events')
  events(): Observable<MessageEvent> {
    return this.alertEvents.subscribe().pipe(
      map((alerta: Alerta) => ({
        data: JSON.stringify(alerta),
      })),
    );
  }
}
