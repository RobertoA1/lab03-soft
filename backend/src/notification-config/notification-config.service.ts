import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NotificationConfig } from '../models/notification-config.model';

const SINGLETON_ID = 1;

@Injectable()
export class NotificationConfigService {
  constructor(
    @InjectModel(NotificationConfig) private model: typeof NotificationConfig,
  ) {}

  /** Devuelve la única fila de configuración. La crea vacía si aún no existe. */
  async get(): Promise<NotificationConfig> {
    const [row] = await this.model.findOrCreate({
      where: { id: SINGLETON_ID },
      defaults: { id: SINGLETON_ID, email: null, telefono: null } as any,
    });
    return row;
  }

  /** Actualiza la fila singleton con los nuevos valores (upsert). */
  async save(data: { email?: string | null; telefono?: string | null }) {
    const row = await this.get();
    row.email = data.email ?? null;
    row.telefono = data.telefono ?? null;
    await row.save();
    return row;
  }
}
