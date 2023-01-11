import { ApiProperty } from "@nestjs/swagger"

export class CreateTransactionDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  paymentId: number;

  @ApiProperty({ default: 0 })
  total: number;

  @ApiProperty({ default: 0 })
  status: number;
}
