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

@Table({ tableName: 'clima', timestamps: true, underscored: true })
export class Clima extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => Lote)
  @Column({ type: DataType.INTEGER, field: 'lote_id' })
  loteId: number;

  @Column(DataType.DATEONLY)
  fecha: string;

  @Column({ type: DataType.FLOAT, field: 'temp_max' })
  tempMax: number;

  @Column({ type: DataType.FLOAT, field: 'temp_min' })
  tempMin: number;

  @Column(DataType.FLOAT)
  precipitacion: number;

  @Column({ type: DataType.FLOAT, field: 'humedad_relativa' })
  humedadRelativa: number;

  @Column({ type: DataType.FLOAT, field: 'radiacion_solar' })
  radiacionSolar: number;

  @Column({ type: DataType.FLOAT, field: 'velocidad_viento' })
  velocidadViento: number;

  @BelongsTo(() => Lote)
  lote: Lote;
}
