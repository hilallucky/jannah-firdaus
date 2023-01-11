import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { PaymentModule } from './payment/payment.module';
import { PrintArrayModule } from './print-array/print-array.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { TransactionModule } from './transaction/transaction.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TransactionModule, PrismaModule, ArticlesModule, ProductModule, PaymentModule, UserModule, PrintArrayModule],
  controllers: [AppController,],
  providers: [AppService,],
})
export class AppModule { }
