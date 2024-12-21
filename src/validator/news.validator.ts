import { IsNotEmpty, IsOptional, IsString, IsUrl, IsNumber } from 'class-validator';

export class newsDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsUrl()
  imageUrl: string;

  @IsNumber()
  @IsNotEmpty()
  authorId: number;
}

export class UpdateNewsDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsUrl()
  imageUrl: string;

  @IsOptional()
  @IsNumber()
  authorId: number;
}
