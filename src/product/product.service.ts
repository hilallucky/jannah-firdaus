import { Injectable, Res } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AppResponse } from 'src/common/response.base';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) { }

  async create(@Res() res, createProductDto: CreateProductDto) {
    try {
      const result = await this.prisma.product.create({ data: createProductDto });
      return AppResponse.ok(res, result)
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === 'P2002') {
          const target = e.meta.target;
          return AppResponse.badRequest(res, `There is a unique constraint violation for ${target} = ${createProductDto[target[0]]}`);
        }
      }
      throw e
    }
  }

  async findAll(@Res() res) {
    const result = await this.prisma.product.findMany({ orderBy: { id: 'asc' } });
    return AppResponse.ok(res, result);
  }

  async findOne(@Res() res, id: number, resultOnly: boolean = false) {
    const result = await this.prisma.product.findUnique({ where: { id } });

    if (!resultOnly) {
      return AppResponse.ok(res, result)
    } else {
      return result;
    }
  }

  async update(@Res() res, id: number, updateProductDto: UpdateProductDto, resultOnly: boolean = false) {
    try {
      const result = await this.prisma.product.update({
        where: { id },
        data: updateProductDto
      });

      // return AppResponse.ok(res, result);
      if (!resultOnly) {
        return AppResponse.ok(res, result)
      } else {
        return result;
      }
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === 'P2002') {
          const target = e.meta.target;
          return AppResponse.badRequest(res, `There is a unique constraint violation for ${target} = ${updateProductDto[target[0]]}`);
        }
      }
      return AppResponse.badRequest(res, `Data not exist for id ${id}`);
    }
  }

  async remove(@Res() res, id: number) {
    try {
      const result = await this.prisma.product.delete({ where: { id } });
      return AppResponse.okNoData(res);
    } catch (error) {
      return AppResponse.badRequest(res, `Data not exist for id ${id}`);
    }
  }
}
