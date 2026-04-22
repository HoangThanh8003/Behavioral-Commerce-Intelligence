import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsObject } from 'class-validator';

export class TrackEventDto {
  @ApiProperty({ example: 'PRODUCT_VIEW' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ example: { productId: 'uuid', source: 'search' } })
  @IsObject()
  payload: any;
}
