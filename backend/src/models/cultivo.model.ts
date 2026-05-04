import {
  Column,
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Lote } from './lote.model';
import type { Produccion } from './produccion.model';

@Table({ tableName: 'cultivos', timestamps: true, underscored: true })
export class Cultivo extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  nombre: string;

  @Column(DataType.STRING)
  variedad: string;

  @Column({ type: DataType.DATEONLY, field: 'fecha_siembra' })
  fechaSiembra: string;

  @Column({ type: DataType.DATEONLY, field: 'fecha_cosecha_est' })
  fechaCosechaEst: string;

  @ForeignKey(() => Lote)
  @Column({ type: DataType.INTEGER, field: 'lote_id' })
  loteId: number;

  @Column(DataType.STRING)
  temporada: string;

  @Column({ type: DataType.FLOAT, field: 'superficie_ha' })
  superficieHa: number;

  @BelongsTo(() => Lote)
  lote: Lote;

  @HasMany(() => require('./produccion.model').Produccion)
  producciones: Produccion[];
}
