import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsEnum, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { InventoryAction } from '@prisma/client';

export class UpdateStockDto {
  @ApiProperty({ enum: ['RESTOCK', 'SALE', 'RETURN', 'ADJUSTMENT'] })
  @IsEnum(['RESTOCK', 'SALE', 'RETURN', 'ADJUSTMENT'])
  action: InventoryAction;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  note?: string;
}

export class CreateInventoryDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  productId: string;

  @ApiProperty({ default: 0 })
  @IsNumber()
  @Min(0)
  quantity: number;

  @ApiProperty({ default: 10 })
  @IsNumber()
  @Min(0)
  lowStockThreshold: number;
}
