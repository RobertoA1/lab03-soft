import {
  Column,
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Lote } from './lote.model';

export type SensorTipo = 'clima' | 'suelo' | 'riego';

@Table({ tableName: 'sensores', timestamps: true, underscored: true })
export class Sensor extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => Lote)
  @Column({ type: DataType.INTEGER, field: 'lote_id', allowNull: false })
  loteId: number;

  @Column({ type: DataType.ENUM('clima', 'suelo', 'riego'), allowNull: false })
  tipo: SensorTipo;

  @Column({ type: DataType.STRING, allowNull: false })
  fabricante: string;

  @Column({ type: DataType.STRING, allowNull: false })
  modelo: string;

  @Column({ type: DataType.STRING, field: 'numero_serie', allowNull: false, unique: true })
  numeroSerie: string;

  @Column({ type: DataType.STRING, allowNull: true })
  firmware: string;

  @Column({ type: DataType.DATEONLY, field: 'fecha_instalacion', allowNull: true })
  fechaInstalacion: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  activo: boolean;

  // JWT token issued for this sensor. Stored so admins can re-reveal it.
  @Column({ type: DataType.TEXT, allowNull: false })
  token: string;

  @BelongsTo(() => Lote)
  lote: Lote;
}
