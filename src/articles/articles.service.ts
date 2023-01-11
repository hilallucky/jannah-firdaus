import { Injectable, Res } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AppResponse } from 'src/common/response.base';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) { }

  async create(@Res() res, createArticleDto: CreateArticleDto) {
    try {
      const result = await this.prisma.article.create({ data: createArticleDto })
      return AppResponse.ok(res, result)
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === 'P2002') {
          const target = e.meta.target;
          return AppResponse.badRequest(res, `There is a unique constraint violation for ${target} = ${createArticleDto[target[0]]}`);
        }
      }
      throw e
    }
  }

  async findAll(@Res() res) {
    const result = await this.prisma.article.findMany({ orderBy: { id: 'asc' } });
    return AppResponse.ok(res, result);
  }

  async findByStatus(@Res() res, status: string) {
    let publish_status: boolean = true;
    if (status === 'false') publish_status = false;

    const result = await this.prisma.article.findMany({
      where: {
        published: publish_status
      }
    });
    return AppResponse.ok(res, result);
  }

  async findOne(@Res() res, id: number) {
    const result = await this.prisma.article.findUnique({ where: { id } });
    return AppResponse.ok(res, result);
  }

  async update(@Res() res, id: number, updateArticleDto: UpdateArticleDto) {
    try {
      const result = await this.prisma.article.update({
        where: { id },
        data: updateArticleDto
      });
      return AppResponse.ok(res, result);
    } catch (error) {
      return AppResponse.badRequest(res, `Data not exist for id ${id}`);
    }
  }

  async remove(@Res() res, id: number) {
    try {
      const result = await this.prisma.article.delete({ where: { id } });
      return AppResponse.ok(res, result);
    } catch (error) {
      return AppResponse.badRequest(res, `Data not exist for id ${id}`);
    }
  }
}
