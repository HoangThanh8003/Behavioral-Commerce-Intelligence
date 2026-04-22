import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private repository: CategoriesRepository) {}

  async create(dto: CreateCategoryDto) {
    if (dto.parentId) {
      const parent = await this.repository.findById(dto.parentId);
      if (!parent) throw new NotFoundException('Parent category not found');
    }
    const category = await this.repository.create(dto);
    // TODO: Emit event 'category.created' to BullMQ
    return category;
  }

  async getTree() {
    return this.repository.findAll();
  }

  async getBySlug(slug: string) {
    const category = await this.repository.findBySlug(slug);
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async update(id: string, dto: UpdateCategoryDto) {
    const category = await this.repository.findById(id);
    if (!category) throw new NotFoundException('Category not found');
    return this.repository.update(id, dto);
  }

  async remove(id: string) {
    const category = await this.repository.findById(id);
    if (!category) throw new NotFoundException('Category not found');
    return this.repository.delete(id);
  }
}
