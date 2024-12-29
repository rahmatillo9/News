import {  BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.entity";

@Table({
    tableName: 'user_profiles',
    timestamps: true
})
export class UserProfile extends Model<UserProfile> {

    @ForeignKey(() => User)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    user_id: number;
  
    @BelongsTo(() => User)
    user: User;
  
    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    profile_picture: string;
  
    @Column({
      type: DataType.TEXT,
      allowNull: true,
    })
    bio: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    phone: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    address: string;
  
    @Column({
      type: DataType.TEXT,
      allowNull: true,
    })
    social_links: string; 
  
}