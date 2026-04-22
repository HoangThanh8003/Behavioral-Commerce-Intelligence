import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsInt, IsUUID, Min } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Electronics' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'electronics' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ default: 0 })
  @IsInt()
  @Min(0)
  @IsOptional()
  sortOrder?: number;

  @ApiProperty({ required: false, format: 'uuid' })
  @IsUUID()
  @IsOptional()
  parentId?: string;
}
