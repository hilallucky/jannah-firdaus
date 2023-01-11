import { ApiProperty } from "@nestjs/swagger";

export class CreatePrintArrayDto {
    @ApiProperty({ default: 1 })
    start: number;

    @ApiProperty({ default: 1 })
    end: number;
}
