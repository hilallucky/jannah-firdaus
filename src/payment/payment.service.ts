import { Injectable, Res } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AppResponse } from 'src/common/response.base';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) { }

  async create(@Res() res, createPaymentDto: CreatePaymentDto) {
    try {
      const result = await this.prisma.paymentType.create({ data: createPaymentDto });
      return AppResponse.ok(res, result)
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === 'P2002') {
          const target = e.meta.target;
          return AppResponse.badRequest(res, `There is a unique constraint violation for ${target} = ${createPaymentDto[target[0]]}`);
        }
      }
      throw e
    }
  }

  async findAll(@Res() res) {
    const result = await this.prisma.paymentType.findMany({ orderBy: { id: 'asc' } });
    return AppResponse.ok(res, result);
  }

  async findOne(@Res() res, id: number, resultOnly: boolean = false) {
    const result = await this.prisma.paymentType.findUnique({ where: { id } });
    
    if (!resultOnly) {
      return AppResponse.ok(res, result)
    } else {
      return result;
    }
  }

  async findOneOnly(id: number) {
    const result = await this.prisma.paymentType.findUnique({ where: { id } });
    return { "data": result };
  }

  async update(@Res() res, id: number, updatePaymentDto: UpdatePaymentDto) {
    try {
      const result = await this.prisma.paymentType.update({
        where: { id },
        data: updatePaymentDto
      });
      return AppResponse.ok(res, result);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === 'P2002') {
          const target = e.meta.target;
          return AppResponse.badRequest(res, `There is a unique constraint violation for ${target} = ${updatePaymentDto[target[0]]}`);
        }
      }
      return AppResponse.badRequest(res, `Data not exist for id ${id}`);
    }
  }

  async remove(@Res() res, id: number) {
    try {
      const result = await this.prisma.paymentType.delete({ where: { id } });
      return AppResponse.okNoData(res);
    } catch (error) {
      return AppResponse.badRequest(res, `Data not exist for id ${id}`);
    }
  }
}
