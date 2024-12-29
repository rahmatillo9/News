import { Controller, Post, UploadedFile, UseInterceptors, Body, Param, Put, Delete, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UserProfileService } from './user_profile.service'; 
import { CreateUserProfileDto, CreateUserProfileUpdateDto } from 'src/validator/user_profiles.validator';
import { UserProfile } from './user_profile.entity';

@Controller('user-profiles')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Post('upload-picture')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/profile-pictures',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const fileName = `${uniqueSuffix}${ext}`;
          callback(null, fileName);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async uploadPicture(@UploadedFile() file: Express.Multer.File, @Body() body: { user_id: number }) {
    try {
      const userProfile = await this.userProfileService.create({
        profile_picture: file.filename,
        user_id: body.user_id,  
      });
  
      return {
        message: 'File uploaded successfully',
        filePath: `/uploads/profile-pictures/${file.filename}`,
        userProfile,
      };
    } catch (error) {
      return {
        message: 'Error uploading file',
        error: error.message,
      };
    }
  }
  

  @Post()
  async createProfile(@Body() createUserProfileDto: CreateUserProfileDto) {
    return this.userProfileService.create(createUserProfileDto);
  }

  @Get()
  async getAllProfiles(): Promise<UserProfile[]> {
    return this.userProfileService.findAll();
  }

  @Get(':id')
  async getProfileById(@Param('id') id: number) {
    return this.userProfileService.findOne(id);
  }

  @Put(':id')
  async updateProfile(
    @Param('id') id: number,
    @Body() updateUserProfileDto: CreateUserProfileUpdateDto,
  ) {
    return this.userProfileService.update(id, updateUserProfileDto);
  }

  @Delete(':id')
  async deleteProfile(@Param('id') id: number) {
    return this.userProfileService.delete(id);
  }
}
