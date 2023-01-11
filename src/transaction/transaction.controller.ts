import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(@Res() res, @Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(res, createTransactionDto);
  }

  @Get()
  findAll(@Res() res) {
    return this.transactionService.findAll(res);
  }

  @Get(':id')
  findOne(@Res() res, @Param('id') id: string) {
    return this.transactionService.findOne(res, +id);
  }

  @Patch(':id')
  update(@Res() res, @Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionService.update(res, +id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Res() res, @Param('id') id: string) {
    return this.transactionService.remove(res, +id);
  }
}
