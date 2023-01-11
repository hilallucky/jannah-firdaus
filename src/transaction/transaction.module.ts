import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';
import { PaymentService } from 'src/payment/payment.service';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, UserService, ProductService, PaymentService],
  imports: [PrismaModule]
})
export class TransactionModule { }
