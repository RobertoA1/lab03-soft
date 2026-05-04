import { Injectable } from '@nestjs/common';
import { Subject, Observable } from 'rxjs';
import { Alerta } from '../models/alerta.model';

@Injectable()
export class AlertasEventsService {
  private alerts$ = new Subject<Alerta>();

  emit(alerta: Alerta) {
    this.alerts$.next(alerta);
  }

  subscribe(): Observable<Alerta> {
    return this.alerts$.asObservable();
  }
}
