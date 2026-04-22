import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCategoryDto) {
    return this.prisma.category.create({ data });
  }

  async findAll() {
    return this.prisma.category.findMany({
      orderBy: { sortOrder: 'asc' },
      include: { children: true },
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.category.findUnique({
      where: { slug },
      include: { children: true, parent: true },
    });
  }

  async findById(id: string) {
    return this.prisma.category.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.category.delete({ where: { id } });
  }
}
