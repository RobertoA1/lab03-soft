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

export type AlertaSeveridad = 'critica' | 'alta' | 'media' | 'baja';
export type AlertaEstado = 'pendiente' | 'reconocida' | 'resuelta';
export type AlertaCategoria = 'hidrico' | 'quimico' | 'climatico' | 'predictivo';

@Table({ tableName: 'alertas', timestamps: true, underscored: true })
export class Alerta extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  tipo: string;

  @Column(DataType.STRING)
  severidad: AlertaSeveridad;

  @Column(DataType.TEXT)
  mensaje: string;

  @Column(DataType.TEXT)
  racional: string;

  @Column(DataType.TEXT)
  recomendacion: string;

  @Column(DataType.FLOAT)
  confianza: number;

  @Column(DataType.STRING)
  categoria: AlertaCategoria;

  @ForeignKey(() => Lote)
  @Column({ type: DataType.INTEGER, field: 'lote_id', allowNull: true })
  loteId: number;

  @Column(DataType.DATEONLY)
  fecha: string;

  @Column({ type: DataType.STRING, defaultValue: 'pendiente' })
  estado: AlertaEstado;

  @Column({ type: DataType.TEXT, allowNull: true, field: 'nota_resolucion' })
  notaResolucion: string;

  @BelongsTo(() => Lote)
  lote: Lote;
}
