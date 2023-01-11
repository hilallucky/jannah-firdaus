import { Injectable } from '@nestjs/common';
import { CreatePrintArrayDto } from './dto/create-print-array.dto';
import { UpdatePrintArrayDto } from './dto/update-print-array.dto';

@Injectable()
export class PrintArrayService {
  create(createPrintArrayDto: CreatePrintArrayDto) {
    return 'This action adds a new printArray';
  }

  findAll() {
    return `This action returns all printArray`;
  }

  findOne(id: number) {
    return `This action returns a #${id} printArray`;
  }

  update(id: number, updatePrintArrayDto: UpdatePrintArrayDto) {
    return `This action updates a #${id} printArray`;
  }

  remove(id: number) {
    return `This action removes a #${id} printArray`;
  }
}
