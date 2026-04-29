import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private repository: ProductsRepository) {}

  async create(dto: CreateProductDto) {
    const product = await this.repository.create(dto);
    return product;
  }

  async findAll(query: { categoryId?: string; page?: number; limit?: number }) {
    const page = Number(query.page || 1);
    const limit = Number(query.limit || 10);
    const skip = (page - 1) * limit;

    return this.repository.findAll({
      categoryId: query.categoryId,
      skip,
      take: limit,
    });
  }

  async findOne(id: string) {
    const product = await this.repository.findById(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async findBySlug(slug: string) {
    const product = await this.repository.findBySlug(slug);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async findRelated(id: string) {
    const product = await this.repository.findById(id);
    if (!product) throw new NotFoundException('Product not found');
    return this.repository.findRelated(id, product.categoryId);
  }

  async search(query: string) {
    return this.repository.search(query);
  }

  async update(id: string, dto: UpdateProductDto) {
    await this.findOne(id);
    return this.repository.update(id, dto);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.repository.softDelete(id);
  }
}
