import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { PrintArrayService } from './print-array.service';
import { CreatePrintArrayDto } from './dto/create-print-array.dto';
import { UpdatePrintArrayDto } from './dto/update-print-array.dto';
import { AppResponse } from 'src/common/response.base';

@Controller('print-array')
export class PrintArrayController {
  constructor(private readonly printArrayService: PrintArrayService) { }

  @Post()
  create(@Res() res, @Body() createPrintArrayDto: CreatePrintArrayDto) {
    let arr = [];

    for (let i = createPrintArrayDto.start; i <= createPrintArrayDto.end; i++) {
      const modThree: number = i % 3,
        modFive: number = i % 5,
        jannah: string = "Jannah",
        firdaus: string = "Firdaus";

      let arrValue: any;
      let word = `Index ke - ${[i - 1]}`;

      arrValue = { [word]: i };

      if (modThree === 0) arrValue = { [word]: jannah };

      if (modFive === 0) arrValue = { [word]: firdaus };

      if (modThree === 0 && modFive === 0) arrValue = { [word]: `${jannah}${firdaus}` };

      arr.push(arrValue);

    }

    return AppResponse.ok(res, arr);
  }
}
