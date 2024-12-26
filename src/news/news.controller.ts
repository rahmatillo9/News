import { Controller, Post, Body, Put, Param, Get, Delete, UseGuards } from '@nestjs/common';
import { NewsService } from './news.service';
import { newsDto } from 'src/validator/news.validator';
import { UpdateNewsDto } from 'src/validator/news.validator';
import { News } from './news.entity';
import { Roles } from 'src/validator/RolesGuard/Roles';
import { JwtAuthGuard } from 'src/authguard/jwt-auth.guard';
import { RolesGuard } from 'src/validator/RolesGuard/Roluse.guard';
import { Role } from 'src/validator/users.validator';


@Controller('News')

export class NewsController {
  constructor(private readonly NewsService: NewsService) {}
  

  @Get()
  async findAll(): Promise<News[]> {
    return this.NewsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id:number): Promise<News | null>{
    return this.NewsService.findOne(id);
  }
  
  @Get('/category/:catigory')
async finbyCategory(@Param('catigory') catigory: string): Promise<News[]>{
  return this.NewsService.getByCategory(catigory)
}

@Get('/author/:authorId')
async finbyAuthor(@Param('authorId') authorId: number): Promise<News[]>{
  return this.NewsService.findByUserId(authorId)
}
  @UseGuards(JwtAuthGuard, RolesGuard)


  @Roles(Role.Admin, Role.Customer)
  @Post()
  async create(@Body() createNewsDto: newsDto): Promise<News> {
    return this.NewsService.create(createNewsDto);
  }


  @Roles(Role.Admin, Role.Customer)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateNewsDto: UpdateNewsDto,
  ): Promise<News> {
    return this.NewsService.update(id, updateNewsDto);
  }
   


      @Roles(Role.Admin, Role.Customer)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void>{
    return this.NewsService.deleteNews(id);
  }
}
