import { IsInt,  IsOptional, IsString,  Length, Matches, MaxLength } from 'class-validator';

export class CreateUserProfileDto {
  @IsInt()
  user_id: number;

  
  @IsString()
  @MaxLength(255, { message: 'Profile picture file name is too long. Maximum length is 255 characters.' })
  profile_picture?: string;

  
  @IsString()
  @Length(0, 500, { message: 'Bio must be between 0 and 500 characters.' })
  bio?: string;

  
  @Matches(/^\+\d{1,15}$/, { message: 'Phone number must be a valid international format (e.g., +123456789).' })
  phone?: string;

  
  @IsString()
  @MaxLength(255, { message: 'Address is too long. Maximum length is 255 characters.' })
  address?: string;

  
  @IsString()
  @MaxLength(1000, { message: 'Social links are too long. Maximum length is 1000 characters.' })
  social_links?: string;
}


export class CreateUserProfileUpdateDto {
  @IsOptional()
  @IsInt()
  user_id: number;

  @IsOptional()
  @IsString()
  profile_picture?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  @IsString()

  @IsOptional()
  @IsString()
  social_links?: string;
}
