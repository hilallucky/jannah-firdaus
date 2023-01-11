import { Injectable, Res } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { AppResponse } from 'src/common/response.base';
import { PaymentService } from 'src/payment/payment.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private productservice: ProductService,
    private paymentService: PaymentService
  ) { }

  async create(@Res() res, createTransactionDto: CreateTransactionDto) {
    try {
      let result: {},
        total: number = 0;

      await this.prisma.$transaction(async (tx) => {
        const checkUser = await this.userService.findOne(res, createTransactionDto.userId, true);
        const checkProduct = await this.productservice.findOne(res, createTransactionDto.productId, true);
        const checkPayment = await this.paymentService.findOne(res, createTransactionDto.paymentId, true);

        if (!checkUser)
          return AppResponse.badRequest(res, `Invalid user id = ${createTransactionDto.userId}`);

        if (!checkProduct)
          return AppResponse.badRequest(
            res,
            `Invalid product id = ${createTransactionDto.productId}`
          );

        if (checkProduct["quantity"] <= 0 || checkProduct["quantity"] - createTransactionDto.quantity <= 0) {
          return AppResponse.badRequest(
            res,
            `Insufficient product quantity. Current quantity for this product ${checkProduct["quantity"]}`
          );
        }

        if (!checkPayment)
          return AppResponse.badRequest(
            res,
            `Invalid payment id = ${createTransactionDto.paymentId}`
          );

        total = checkProduct["price"] * createTransactionDto.quantity;
        createTransactionDto.total = total;

        const updateProductQty = await this.productservice.update(
          res,
          createTransactionDto.productId,
          {
            "quantity": checkProduct["quantity"] - createTransactionDto.quantity
          },
          true);


        result = await this.prisma.cart.create({
          data: createTransactionDto,
          include: {
            user: {
              select: {
                name: true
              }
            },
            product: {
              select: {
                name: true
              }
            },
            payment: {
              select: {
                name: true
              }
            }
          },
        });

      })

      return AppResponse.ok(res, result)
    } catch (e) {
      throw e.message
    }
  }

  async findAll(@Res() res) {
    const result = await this.prisma.cart.findMany({
      include: {
        user: {
          select: {
            name: true
          }
        },
        product: {
          select: {
            name: true
          }
        },
        payment: {
          select: {
            name: true
          }
        }
      },
      orderBy: { id: 'asc' }
    });
    return AppResponse.ok(res, result);
  }

  async findOne(@Res() res, id: number) {
    const result = await this.prisma.cart.findUnique({
      include: {
        user: {
          select: {
            name: true
          }
        },
        product: {
          select: {
            name: true
          }
        },
        payment: {
          select: {
            name: true
          }
        }
      },
      where: { id }
    });
    return AppResponse.ok(res, result);
  }

  async update(@Res() res, id: number, updateTransactionDto: UpdateTransactionDto) {
    try {
      let result: {},
        total: number = 0;

      await this.prisma.$transaction(async (tx) => {
        const checkUser = await this.userService.findOne(res, updateTransactionDto.userId, true);
        const checkProduct = await this.productservice.findOne(res, updateTransactionDto.productId, true);
        const checkPayment = await this.paymentService.findOne(res, updateTransactionDto.paymentId, true);

        if (!checkUser)
          return AppResponse.badRequest(res, `Invalid user id = ${updateTransactionDto.userId}`);

        if (!checkProduct)
          return AppResponse.badRequest(
            res,
            `Invalid product id = ${updateTransactionDto.productId}`
          );

        if (checkProduct["quantity"] <= 0 || checkProduct["quantity"] - updateTransactionDto.quantity <= 0) {
          return AppResponse.badRequest(
            res,
            `Insufficient product quantity. Current quantity for this product ${checkProduct["quantity"]}`
          );
        }

        if (!checkPayment)
          return AppResponse.badRequest(
            res,
            `Invalid payment id = ${updateTransactionDto.paymentId}`
          );

        total = checkProduct["price"] * updateTransactionDto.quantity;
        updateTransactionDto.total = total;

        const updateProductQty = await this.productservice.update(
          res,
          updateTransactionDto.productId,
          {
            "quantity": checkProduct["quantity"] - updateTransactionDto.quantity
          },
          true);


        result = await this.prisma.cart.update({
          include: {
            user: {
              select: {
                name: true
              }
            },
            product: {
              select: {
                name: true
              }
            },
            payment: {
              select: {
                name: true
              }
            }
          },
          where: { id },
          data: updateTransactionDto
        });

      })

      return AppResponse.ok(res, result)

    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === 'P2002') {
          const target = e.meta.target;
          return AppResponse.badRequest(res, `There is a unique constraint violation for ${target} = ${updateTransactionDto[target[0]]}`);
        }
      }
      return AppResponse.badRequest(res, `Data not exist for id ${id}`);
    }
  }

  async remove(@Res() res, id: number) {
    try {
      const result = await this.prisma.cart.delete({ where: { id } });
      return AppResponse.okNoData(res);
    } catch (error) {
      return AppResponse.badRequest(res, `Data not exist for id ${id}`);
    }
  }
}
