import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";


export enum Role{
    Customer = 'customer',
    Admin = 'admin',
}

export class CreateUsersDto{
    @IsString()
    @IsNotEmpty()
    Lastname: string;
   
    @IsEnum(Role)
    @IsNotEmpty()
    role: Role;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

}


export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    Lastname?: string;
  
    @IsOptional()
    @IsEnum(Role)  
    role?: Role;

  
    @IsOptional()
    @IsEmail()
    email?: string;
  
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    password?: string;

  }