import { PartialType } from '@nestjs/swagger';
import { CreatePrintArrayDto } from './create-print-array.dto';

export class UpdatePrintArrayDto extends PartialType(CreatePrintArrayDto) {}
