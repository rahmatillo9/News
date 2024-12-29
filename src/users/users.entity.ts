import {Column, DataType,  HasMany,  HasOne,  Model,  Table } from "sequelize-typescript";
import { News } from "src/news/news.entity";
import { UserProfile } from "src/user_profiles/user_profile.entity";



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
  
  @HasOne(() => UserProfile)
  profile: UserProfile;

}