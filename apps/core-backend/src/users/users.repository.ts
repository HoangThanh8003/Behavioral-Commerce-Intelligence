import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.user.create({ data });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return this.prisma.user.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async findAll(skip?: number, take?: number) {
    return this.prisma.user.findMany({
      where: { deletedAt: null },
      skip,
      take,
    });
  }

  async update(id: string, data: any) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async softDelete(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
