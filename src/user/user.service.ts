import { Injectable, Res } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { AppResponse } from 'src/common/response.base';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async create(@Res() res, createUserDto: CreateUserDto) {
    try {
      const result = await this.prisma.user.create({ data: createUserDto });
      return AppResponse.ok(res, result)
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === 'P2002') {
          const target = e.meta.target;
          return AppResponse.badRequest(res, `There is a unique constraint violation for ${target} = ${createUserDto[target[0]]}`);
        }
      }
      throw e
    }
  }

  async findAll(@Res() res) {
    const result = await this.prisma.user.findMany({ orderBy: { id: 'asc' } });
    return AppResponse.ok(res, result);
  }

  async findOne(@Res() res, id: number, resultOnly: boolean = false) {
    const result = await this.prisma.user.findUnique({ where: { id } });

    if (!resultOnly) {
      return AppResponse.ok(res, result)
    } else {
      return result;
    }
  }

  async update(@Res() res, id: number, updateUserDto: UpdateUserDto) {
    try {
      const result = await this.prisma.user.update({
        where: { id },
        data: updateUserDto
      });
      return AppResponse.ok(res, result);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === 'P2002') {
          const target = e.meta.target;
          return AppResponse.badRequest(res, `There is a unique constraint violation for ${target} = ${updateUserDto[target[0]]}`);
        }
      }
      return AppResponse.badRequest(res, `Data not exist for id ${id}`);
    }
  }

  async remove(@Res() res, id: number) {
    try {
      const result = await this.prisma.user.delete({ where: { id } });
      return AppResponse.okNoData(res);
    } catch (error) {
      return AppResponse.badRequest(res, `Data not exist for id ${id}`);
    }
  }
}
