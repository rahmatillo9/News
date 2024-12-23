import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { News } from './news.entity';
import { newsDto } from 'src/validator/news.validator';
import { UpdateNewsDto } from 'src/validator/news.validator';
import { User } from 'src/users/users.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News)
    private readonly newsModel: typeof News, 
  ) {}


  async create(newsDto: newsDto): Promise<News> {
    return this.newsModel.create(newsDto);
  }


  async update(id: number, updateNewsDto: UpdateNewsDto): Promise<News> {
    const news = await this.newsModel.findByPk(id);
    if (!news) {
      throw new NotFoundException(`News ID: ${id} topilmadi`);
    }
    return news.update(updateNewsDto);
  }


  async findAll(): Promise<News[]> {
    return this.newsModel.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['Lastname'], 
        },
      ],
    });
  }


  async findOne(id: number): Promise<News> {
    const news = await this.newsModel.findOne({
      where: { id },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['Lastname'], 
        },
      ],
    });

    if (!news) {
      throw new NotFoundException(`News ID: ${id} topilmadi`);
    }

    return news;
  }

  async getByCategory(catigory: string): Promise<News[]> {
    try {
      const news = await this.newsModel.findAll({
        where: { catigory }, 
        include: [
          {
            model: User,
            as: 'user', 
            attributes: ['Lastname'], 
          },
        ],
      });
  

      if (!news || news.length === 0) {
        throw new Error('No news found for this category');
      }
  
      return news; 
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch news by category');
    }
  }
  
  

  async deleteNews(id: number): Promise<void> {
    const news = await this.newsModel.findOne({ where: { id } });
    if (!news) {
      throw new NotFoundException(`News ID: ${id} topilmadi`);
    }
    await news.destroy();
  }
}
