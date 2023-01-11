import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  create(@Res() res, @Body() createProductDto: CreateProductDto) {
    return this.productService.create(res, createProductDto);
  }

  @Get()
  findAll(@Res() res) {
    return this.productService.findAll(res);
  }

  @Get(':id')
  findOne(@Res() res, @Param('id') id: string) {
    return this.productService.findOne(res, +id);
  }

  @Patch(':id')
  update(@Res() res, @Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(res, +id, updateProductDto);
  }

  @Delete(':id')
  remove(@Res() res, @Param('id') id: string) {
    return this.productService.remove(res, +id);
  }
}
