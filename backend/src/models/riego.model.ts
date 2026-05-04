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

@Table({ tableName: 'riego', timestamps: true, underscored: true })
export class Riego extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => Lote)
  @Column({ type: DataType.INTEGER, field: 'lote_id' })
  loteId: number;

  @Column(DataType.DATEONLY)
  fecha: string;

  @Column({ type: DataType.STRING, field: 'tipo_riego' })
  tipoRiego: string;

  @Column({ type: DataType.FLOAT, field: 'volumen_aplicado_l' })
  volumenAplicadoL: number;

  @Column({ type: DataType.FLOAT, field: 'duracion_horas' })
  duracionHoras: number;

  @Column({ type: DataType.FLOAT, field: 'presion_bar' })
  presionBar: number;

  @BelongsTo(() => Lote)
  lote: Lote;
}
