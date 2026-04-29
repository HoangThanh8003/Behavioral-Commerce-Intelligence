import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByProvider(provider: 'GOOGLE' | 'FACEBOOK', providerId: string) {
    return this.prisma.user.findUnique({
      where: { providerId },
    });
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async findAll(params: { skip?: number; take?: number }) {
    return this.prisma.user.findMany({
      where: { deletedAt: null },
      skip: params.skip ? Number(params.skip) : undefined,
      take: params.take ? Number(params.take) : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }
}
