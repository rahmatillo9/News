import { Controller, Post, UploadedFile, UseInterceptors, Body, Param, Put, Delete, Get, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UserProfileService } from './user_profile.service'; 
import { CreateUserProfileDto, CreateUserProfileUpdateDto } from 'src/validator/user_profiles.validator';
import { UserProfile } from './user_profile.entity';
import { RolesGuard } from 'src/validator/RolesGuard/Roluse.guard';
import { JwtAuthGuard } from 'src/authguard/jwt-auth.guard';
import { Roles } from 'src/validator/RolesGuard/Roles';
import { Role } from 'src/validator/users.validator';

@Controller('user-profiles')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}
  
  @Get()
  async getAllProfiles(): Promise<UserProfile[]> {
    return this.userProfileService.findAll();
  }

@Get('user/:user_id')
async getProfileUserId(@Param('user_id') user_id: string) {
    const parsedUserId = parseInt(user_id, 10);
    if (isNaN(parsedUserId)) {
        return {
            message: 'Invalid user_id value',
            error: 'User ID must be a number',
        };
    }

    try {
        const userProfile = await this.userProfileService.findOneByUserId(parsedUserId);
        if (!userProfile) {
            return {
                message: 'Profile not found',
                error: 'User profile not found',
            };
        }
        return userProfile;
    } catch (error) {
        return {
            message: 'Error fetching profile',
            error: error.message,
        };
    }
}


  @Get(':id')
  async getProfileById(@Param('id') id: number) {
    try {
      const userProfile = await this.userProfileService.findOne(id);
      if (!userProfile) {
        return {
          message: 'Profile not found',
          error: 'User profile not found',
        };
      }
      return userProfile;
    } catch (error) {
      return {
        message: 'Error fetching profile',
        error: error.message,
      };
    }
  }


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
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
async updateProfile(
  @Param('id') id: number,
  @UploadedFile() file: Express.Multer.File,
  @Body() updateProfileDto: CreateUserProfileUpdateDto,
) {
  try {
    const profile_picture = file ? file.filename : undefined;
    const updatedData = {
      ...updateProfileDto,
      ...(profile_picture && { profile_picture }),
    };

    const updatedProfile = await this.userProfileService.update(id, updatedData);

    return {
      message: 'Profile updated successfully',
      updatedProfile,
    };
  } catch (error) {
    return {
      message: 'Error updating profile',
      error: error.message,
    };
  }
}

@Roles(Role.Admin, Role.Customer)

  @Post()
  async createProfile(@Body() createUserProfileDto: CreateUserProfileDto) {
    try {
      const profile = await this.userProfileService.create(createUserProfileDto);
      return {
        message: 'Profile created successfully',
        profile,
      };
    } catch (error) {
      return {
        message: 'Error creating profile',
        error: error.message,
      };
    }
  }





@Roles(Role.Admin, Role.Customer)
  @Delete(':id')
  async deleteProfile(@Param('id') id: number) {
    try {
      await this.userProfileService.delete(id);
      return {
        message: 'Profile deleted successfully',
      };
    } catch (error) {
      return {
        message: 'Error deleting profile',
        error: error.message,
      };
    }
  }
}
