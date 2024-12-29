import { UserProfile } from './user_profile.entity';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserProfileController } from './user_profile.controller';
import { UserProfileService } from './user_profile.service';
import { User } from 'src/users/users.entity';

@Module({
  imports: [SequelizeModule.forFeature([UserProfile, User])],
  controllers: [UserProfileController],
  providers: [UserProfileService],
})
export class UserProfileModule {}
