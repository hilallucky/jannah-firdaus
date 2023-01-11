import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

class Article {
  id: number;
  title: string;
  description: string;
  body: string;
  published: boolean = false;
  createdAt: Date;
  updatedAt: Date;
}

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) { }

  @Post()
  create(@Res() res, @Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(res, createArticleDto);
  }

  @Get()
  findAll(@Res() res,) {
    return this.articlesService.findAll(res);
  }

  @Get('status/:status')
  findByStatus(@Res() res, @Param('status') status: string) {
    return this.articlesService.findByStatus(res, status);
  }

  @Get(':id')
  findOne(@Res() res, @Param('id') id: number) {
    return this.articlesService.findOne(res, +id);
  }

  @Patch(':id')
  update(@Res() res, @Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(res, +id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Res() res, @Param('id') id: string) {
    return this.articlesService.remove(res, +id);
  }
}
