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

@Table({ tableName: 'suelo', timestamps: true, underscored: true })
export class Suelo extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => Lote)
  @Column({ type: DataType.INTEGER, field: 'lote_id' })
  loteId: number;

  @Column(DataType.DATEONLY)
  fecha: string;

  @Column(DataType.FLOAT)
  humedad: number;

  @Column(DataType.FLOAT)
  ph: number;

  @Column({ type: DataType.FLOAT, field: 'nitrogeno_disponible' })
  nitrogenoDisponible: number;

  @Column({ type: DataType.FLOAT, field: 'fosforo_disponible' })
  fosforoDisponible: number;

  @Column({ type: DataType.FLOAT, field: 'conductividad_electrica' })
  conductividadElectrica: number;

  @BelongsTo(() => Lote)
  lote: Lote;
}
