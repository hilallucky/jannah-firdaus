import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Post()
  create(@Res() res, @Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(res, createPaymentDto);
  }

  @Get()
  findAll(@Res() res) {
    return this.paymentService.findAll(res);
  }

  @Get(':id')
  findOne(@Res() res, @Param('id') id: string) {
    return this.paymentService.findOne(res, +id);
  }

  @Patch(':id')
  update(@Res() res, @Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(res, +id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Res() res, @Param('id') id: string) {
    return this.paymentService.remove(res, +id);
  }
}
