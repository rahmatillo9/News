import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto, Role, UpdateUserDto } from 'src/validator/users.validator'
import { User } from './users.entity';
import { RolesGuard } from 'src/validator/RolesGuard/Roluse.guard';
import { Roles } from 'src/validator/RolesGuard/Roles';
import { JwtAuthGuard } from 'src/authguard/jwt-auth.guard';

@Controller('')


export class UsersController {

    constructor(private readonly usersServise: UsersService){}
    @Post()
    async createUser(@Body() createUserDto: CreateUsersDto): Promise<User>{
        return this.usersServise.createUser(
            createUserDto.Lastname,
            createUserDto.email,
            createUserDto.role,
            createUserDto.password,
            
        );
        
    }
   


    

    @UseGuards(JwtAuthGuard, RolesGuard)

    @Roles(Role.Admin)
    @Get()
    async findAll(): Promise<User[]>{
          
        return this.usersServise.findAll();
    }



    @Roles(Role.Admin)
    @Get('/email/:email')
async finbyEmail(@Param('email') email: string): Promise<User>{
  return this.usersServise.findByEmail(email)
}


@Roles(Role.Admin, Role.Customer)
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<User> {
      return this.usersServise.findOne(id);
    }



    @Roles(Role.Admin, Role.Customer)
    @Patch(':id')
    async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
      const [_, [updatedUser]] = await this.usersServise.updateUser(id, updateUserDto);
      return updatedUser;
    }
    
    @Roles(Role.Admin, Role.Customer)
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return this.usersServise.deleteUser(id);
  }

}
