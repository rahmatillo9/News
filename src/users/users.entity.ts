import {Column, DataType,  HasMany,  Model,  Table } from "sequelize-typescript";
import { News } from "src/news/news.entity";



@Table({
    tableName: 'users6',
    timestamps: true
})
export class User extends Model<User>{
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  Lastname!: string;

  @Column({
    type: DataType.ENUM( 'customer', 'admin'),
    allowNull: false,
    defaultValue: 'customer',
  })
  role!: string;
   
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string
  
     
  @HasMany(() => News)
  News!: News[];


}