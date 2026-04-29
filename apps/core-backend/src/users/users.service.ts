import { Injectable, ConflictException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private repository: UsersRepository) {}

  async create(data: Prisma.UserCreateInput) {
    // Check if email or username already exists
    const existingEmail = await this.repository.findByEmail(data.email);
    if (existingEmail) {
      throw new ConflictException('Email already exists');
    }

    if ((data as any).username) {
      const existingUsername = await this.repository.findByUsername((data as any).username);
      if (existingUsername) {
        throw new ConflictException('Username already exists');
      }
    }

    // Hash password if it exists
    if ((data as any).passwordHash) {
      (data as any).passwordHash = await bcrypt.hash((data as any).passwordHash, 10);
    }

    return this.repository.create(data);
  }

  async findByEmail(email: string) {
    return this.repository.findByEmail(email);
  }

  async findByUsername(username: string) {
    return this.repository.findByUsername(username);
  }

  async findById(id: string) {
    return this.repository.findById(id);
  }

  async findByProvider(provider: 'GOOGLE' | 'FACEBOOK', providerId: string) {
    return this.repository.findByProvider(provider, providerId);
  }

  async findAll(params: { skip?: number; take?: number }) {
    // Note: You might want to add findMany to repository
    return this.repository.findAll(params);
  }

  async findOne(id: string) {
    return this.repository.findById(id);
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    return this.repository.update(id, data);
  }

  async remove(id: string) {
    return this.repository.update(id, { deletedAt: new Date(), isActive: false });
  }
}
