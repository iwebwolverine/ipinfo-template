import {Table, Column, Model, AutoIncrement, PrimaryKey, DataType } from 'sequelize-typescript';
 
@Table({
  tableName: 'proxies',
  underscored: true,
})
export class ProxyEntity extends Model<ProxyEntity> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  })
  id: string;

  @Column
  city: string;
 
  @Column
  ip: string;
  
  @Column
  type: string;
  
  @Column
  country: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}