import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import * as dotenv from "dotenv";
import { UserModule } from './users/users.module';
import { AuthModule } from './authguard/JwtModule ';
import { NewsModule } from './news/news.module';

dotenv.config();
@Module({
  imports: [
    NewsModule,
    UserModule,
    AuthModule,
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadModels: true,
      synchronize: true,
    }),

  ],
})
export class AppModule {}