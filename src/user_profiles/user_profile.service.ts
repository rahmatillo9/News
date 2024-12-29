import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserProfile } from "./user_profile.entity";
import { CreateUserProfileDto, CreateUserProfileUpdateDto } from "src/validator/user_profiles.validator";
import { User } from "src/users/users.entity";

@Injectable()
export class UserProfileService {
    constructor(
        @InjectModel(UserProfile)
        private readonly userProfileModel: typeof UserProfile,
    ){}
    async create(userProfileDto : CreateUserProfileDto): Promise<UserProfile>{
        return this.userProfileModel.create(userProfileDto);
    }

    async findAll(): Promise<UserProfile[]>{
        return this.userProfileModel.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['Lastname'],
                },
            ],
        });
    }

    async findOne(id: number): Promise<UserProfile>{
        const userProfile = await this.userProfileModel.findOne({
            where: {id},
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['Lastname'],
                },
            ],
        });
        if(!userProfile){
            throw new NotFoundException(`User Profile ID: ${id} not found`);
        }
        return userProfile;
    }

    async update(id: number, updateUserProfileDto: CreateUserProfileUpdateDto): Promise<UserProfile>{
        const userProfile = await this.userProfileModel.findByPk(id);
        if(!userProfile){
            throw new NotFoundException(`User Profile ID: ${id} not found`);
        }
        return userProfile.update(updateUserProfileDto);
    }

    async delete(id: number): Promise<void>{
        const userProfile = await this.userProfileModel.findByPk(id);
        if(!userProfile){
            throw new NotFoundException(`User Profile ID: ${id} not found`);
        }
        await userProfile.destroy();
    }
}