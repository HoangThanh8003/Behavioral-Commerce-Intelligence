import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export class AddToCartDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ default: 1 })
  @IsNumber()
  @Min(1)
  quantity: number;
}

export class UpdateCartItemDto {
  @ApiProperty({ example: 2 })
  @IsNumber()
  @Min(1)
  quantity: number;
}
