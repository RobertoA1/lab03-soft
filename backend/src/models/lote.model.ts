import { Column, Table, Model, PrimaryKey, AutoIncrement, DataType, HasMany } from 'sequelize-typescript';
import type { Cultivo } from './cultivo.model';
import type { Clima } from './clima.model';
import type { Suelo } from './suelo.model';
import type { Riego } from './riego.model';
import type { Sensor } from './sensor.model';

@Table({ tableName: 'lotes', timestamps: true, underscored: true })
export class Lote extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  nombre: string;

  @Column({ type: DataType.FLOAT, field: 'superficie_ha' })
  superficieHa: number;

  @Column(DataType.STRING)
  cultivo: string;

  @Column(DataType.STRING)
  ubicacion: string;

  @HasMany(() => require('./cultivo.model').Cultivo)
  cultivos: Cultivo[];

  @HasMany(() => require('./clima.model').Clima)
  climas: Clima[];

  @HasMany(() => require('./suelo.model').Suelo)
  suelos: Suelo[];

  @HasMany(() => require('./riego.model').Riego)
  riegos: Riego[];

  @HasMany(() => require('./sensor.model').Sensor)
  sensores: Sensor[];
}
