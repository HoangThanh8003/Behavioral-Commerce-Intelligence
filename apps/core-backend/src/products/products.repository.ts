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

  async findAll(params: { categoryId?: string; categorySlug?: string; skip?: number; take?: number }) {
    const { categoryId, categorySlug, skip, take } = params;
    return this.prisma.product.findMany({
      where: { 
        ...(categoryId ? { categoryId } : {}),
        ...(categorySlug ? { category: { slug: categorySlug } } : {}),
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

  async findBySlug(slug: string) {
    return this.prisma.product.findFirst({
      where: { slug, deletedAt: null },
      include: { category: true, inventory: true },
    });
  }

  async findRelated(productId: string, categoryId: string | null, limit = 4) {
    return this.prisma.product.findMany({
      where: {
        deletedAt: null,
        id: { not: productId },
        ...(categoryId ? { categoryId } : {}),
      },
      take: limit,
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async search(query: string, limit = 10) {
    return this.prisma.product.findMany({
      where: {
        deletedAt: null,
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
      take: limit,
      include: { category: true },
      orderBy: { createdAt: 'desc' },
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
