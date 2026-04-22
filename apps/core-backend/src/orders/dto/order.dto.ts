import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsUUID } from 'class-validator';

export class PlaceOrderDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  shippingName: string;

  @ApiProperty({ example: '+1234567890' })
  @IsString()
  @IsNotEmpty()
  shippingPhone: string;

  @ApiProperty({ example: '123 Main St, NY' })
  @IsString()
  @IsNotEmpty()
  shippingAddress: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  note?: string;
}
