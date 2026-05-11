import {
  Column,
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
} from 'sequelize-typescript';

/**
 * Configuración global de notificaciones. v1 mantiene una sola fila (id = 1)
 * con el email y teléfono del agrónomo para que n8n despache alertas por
 * EmailJS y Evolution API.
 */
@Table({ tableName: 'notification_config', timestamps: true, underscored: true })
export class NotificationConfig extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column({ type: DataType.STRING, allowNull: true })
  email: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  telefono: string | null;
}
