import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, IsEnum, IsBoolean } from 'class-validator';
import { UserRole } from '@nexusai/types';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'The email of the user' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123', description: 'The password of the user (min 6 chars)' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'John Doe', description: 'The full name of the user' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '+1234567890', description: 'The phone number of the user', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ enum: ['CUSTOMER', 'ADMIN', 'STAFF'], default: 'CUSTOMER' })
  @IsEnum(['CUSTOMER', 'ADMIN', 'STAFF'])
  @IsOptional()
  role?: UserRole;

  @ApiProperty({ example: 'https://example.com/avatar.jpg', required: false })
  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @ApiProperty({ example: '123 Main St, Hanoi', required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ example: 'John Doe Jr.', required: false })
  @IsString()
  @IsOptional()
  shippingName?: string;

  @ApiProperty({ default: true, required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
