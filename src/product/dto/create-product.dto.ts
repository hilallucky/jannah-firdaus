import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
  @ApiProperty()
  name: string;
  
  @ApiProperty({ default: 0})
  price: number;
  
  @ApiProperty({ default: 0 })
  quantity: number;
}
