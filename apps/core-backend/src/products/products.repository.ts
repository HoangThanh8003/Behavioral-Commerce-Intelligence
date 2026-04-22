import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProductDto) {
    return this.prisma.product.create({ data });
  }

  async findAll(params: { categoryId?: string; skip?: number; take?: number }) {
    const { categoryId, skip, take } = params;
    return this.prisma.product.findMany({
      where: { 
        categoryId,
        deletedAt: null 
      },
      skip,
      take,
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    return this.prisma.product.findFirst({
      where: { id, deletedAt: null },
      include: { category: true, inventory: true },
    });
  }

  async searchSimilar(vector: number[], limit = 5) {
    return this.prisma.$queryRaw`
      SELECT id, name, slug, price, "imageUrls"
      FROM "Product"
      WHERE "deletedAt" IS NULL
      ORDER BY vector <=> ${vector}::vector
      LIMIT ${limit}
    `;
  }

  async update(id: string, data: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async softDelete(id: string) {
    return this.prisma.product.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
