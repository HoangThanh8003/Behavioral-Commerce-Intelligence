import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto, RegisterDto, SocialLoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const user = await this.usersService.create({
      username: dto.username,
      email: dto.email,
      passwordHash: dto.password,
      name: dto.name,
      provider: 'LOCAL' as any,
    });

    return this.generateToken(user);
  }

  async login(dto: LoginDto) {
    // Try finding by username first, then email
    let user = await this.usersService.findByUsername(dto.identifier);
    if (!user) {
      user = await this.usersService.findByEmail(dto.identifier);
    }

    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(user);
  }

  async socialLogin(dto: SocialLoginDto) {
    let user = await this.usersService.findByProvider(dto.provider, dto.providerId);

    if (!user) {
      // Check if email already exists
      const existingUser = await this.usersService.findByEmail(dto.email);
      if (existingUser) {
        // Link provider to existing account
        // In a real app, you might want to verify email ownership first
        user = existingUser;
      } else {
        // Create new user
        user = await this.usersService.create({
          email: dto.email,
          name: dto.name,
          avatarUrl: dto.avatarUrl,
          provider: dto.provider as any,
          providerId: dto.providerId,
        });
      }
    }

    return this.generateToken(user);
  }

  private generateToken(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        name: user.name,
        role: user.role,
        avatarUrl: user.avatarUrl,
      },
    };
  }
}
