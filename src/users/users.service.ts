import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.entity';
import * as bcrypt from "bcryptjs"

@Injectable()
export class UsersService {
 constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
 ){}

 async createUser(Lastname: string, email: string, role:string, password: string): Promise<User>{
    const hashPassword = await bcrypt.hash(password, 10);
    return this.userModel.create({Lastname, email, role, password: hashPassword});

 }

 async validatePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword); 
  }

  async findAll(): Promise<User[]>{
    return this.userModel.findAll({
      
      attributes: ['id', 'Lastname', 'role', 'email' ],
    });

  }

  async findOne(id: number): Promise<User>{
    return this.userModel.findOne({
        where:{id},
        attributes: ['id', 'Lastname', 'role', 'email' ],
    });
  }

  async updateUser(id: number, userData: Partial<User>): Promise<[number, User[]]>{
    return this.userModel.update(userData,{
        where: {id},
        returning: true,
    });
  }
  
  async findByLastname(Lastname: string): Promise<User | null> {
    return this.userModel.findOne({ where: { Lastname }});
  }

  async findByEmail(email: string): Promise<User | null> {
    console.log('findByEmail service', email)
    return this.userModel.findOne({ where: { email } }); 
  }

  async deleteUser(id: number): Promise<void>{
    const user = await this.userModel.findOne({ where: { id } });
    if(user){
        await user.destroy();
    }
  }





}
