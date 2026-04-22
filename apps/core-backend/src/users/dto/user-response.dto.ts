import { ApiProperty } from '@nestjs/swagger';
import { User, UserRole } from '@nexusai/types';

export class UserResponseDto implements User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ nullable: true })
  phone: string | null;

  @ApiProperty({ enum: ['CUSTOMER', 'ADMIN', 'STAFF'] })
  role: UserRole;

  @ApiProperty({ nullable: true })
  avatarUrl: string | null;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}
