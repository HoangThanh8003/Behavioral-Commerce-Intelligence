import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsNumber, IsArray, IsUUID } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'iPhone 15 Pro' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'iphone-15-pro' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 999.99 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 1099.99, required: false })
  @IsNumber()
  @IsOptional()
  comparePrice?: number;

  @ApiProperty({ example: 'IPH15P-BLK' })
  @IsString()
  @IsNotEmpty()
  sku: string;

  @ApiProperty({ type: [String], example: ['https://img.com/1.jpg'] })
  @IsArray()
  @IsString({ each: true })
  imageUrls: string[];

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  categoryId: string;
}
