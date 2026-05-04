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
import { Cultivo } from './cultivo.model';
import { Lote } from './lote.model';

@Table({ tableName: 'produccion', timestamps: true, underscored: true })
export class Produccion extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => Cultivo)
  @Column({ type: DataType.INTEGER, field: 'cultivo_id' })
  cultivoId: number;

  @ForeignKey(() => Lote)
  @Column({ type: DataType.INTEGER, field: 'lote_id' })
  loteId: number;

  @Column(DataType.STRING)
  temporada: string;

  @Column({ type: DataType.FLOAT, field: 'rendimiento_tn_ha' })
  rendimientoTnHa: number;

  @Column({ type: DataType.STRING, field: 'calidad_grano' })
  calidadGrano: string;

  @Column({ type: DataType.FLOAT, field: 'costos_operativos' })
  costosOperativos: number;

  @Column({ type: DataType.FLOAT, field: 'ingresos_brutos' })
  ingresosBrutos: number;

  @Column(DataType.TEXT)
  observaciones: string;

  @BelongsTo(() => Cultivo)
  cultivo: Cultivo;

  @BelongsTo(() => Lote)
  lote: Lote;
}
