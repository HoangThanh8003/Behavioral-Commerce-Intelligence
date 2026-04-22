import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo category mới (Admin/Staff)' })
  create(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy toàn bộ cây category' })
  findAll() {
    return this.categoriesService.getTree();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Lấy chi tiết category theo slug' })
  findOne(@Param('slug') slug: string) {
    return this.categoriesService.getBySlug(slug);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật category' })
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.categoriesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa category' })
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
