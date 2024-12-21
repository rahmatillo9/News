import { News } from 'src/news/news.entity';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { NewsController } from './news.controller';
import { NewsService } from './News.service';
import { User } from 'src/users/users.entity';

@Module({
  imports: [SequelizeModule.forFeature([News, User])],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
