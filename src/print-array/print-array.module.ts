import { Module } from '@nestjs/common';
import { PrintArrayService } from './print-array.service';
import { PrintArrayController } from './print-array.controller';

@Module({
  controllers: [PrintArrayController],
  providers: [PrintArrayService]
})
export class PrintArrayModule {}
