import { Controller, Post, Body, Put, Param, Get, Delete, UseGuards } from '@nestjs/common';
import { NewsService } from './News.service';
import { newsDto } from 'src/validator/news.validator';
import { UpdateNewsDto } from 'src/validator/news.validator';
import { News } from './News.entity';
import { Roles } from 'src/validator/RolesGuard/Roles';
import { JwtAuthGuard } from 'src/authguard/jwt-auth.guard';
import { RolesGuard } from 'src/validator/RolesGuard/Roluse.guard';
import { Role } from 'src/validator/users.validator';


@Controller('News')
// @UseGuards(JwtAuthGuard, RolesGuard)
export class NewsController {
  constructor(private readonly NewsService: NewsService) {}
  

  @Post()
  async create(@Body() createNewsDto: newsDto): Promise<News> {
    return this.NewsService.create(createNewsDto);
  }


  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateNewsDto: UpdateNewsDto,
  ): Promise<News> {
    return this.NewsService.update(id, updateNewsDto);
  }

  @Get()
  async findAll(): Promise<News[]> {
    return this.NewsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id:number): Promise<News | null>{
    return this.NewsService.findOne(id);
  }
  
  
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void>{
    return this.NewsService.deleteNews(id);
  }
}
