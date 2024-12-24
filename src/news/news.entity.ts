import {  BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.entity";

@Table({
    tableName: 'News',
    timestamps: true
})
export class News extends Model<News>{
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title!: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    description!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    imageUrl!: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    category: string

    @ForeignKey(() => User) 
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    authorId!: number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
      })
      createdAt: Date;
    
      @BelongsTo(() => User, {as: 'user'})
      user: User;

}