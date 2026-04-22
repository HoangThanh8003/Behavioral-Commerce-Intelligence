import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { UpdateStockDto, CreateInventoryDto } from './dto/inventory.dto';

@ApiTags('Inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  @ApiOperation({ summary: 'Khởi tạo tồn kho cho sản phẩm' })
  create(@Body() dto: CreateInventoryDto) {
    return this.inventoryService.create(dto);
  }

  @Get(':productId')
  @ApiOperation({ summary: 'Lấy trạng thái tồn kho của sản phẩm' })
  getStatus(@Param('productId') productId: string) {
    return this.inventoryService.getStatus(productId);
  }

  @Patch(':productId/stock')
  @ApiOperation({ summary: 'Cập nhật số lượng tồn kho (Restock/Sale/...)' })
  updateStock(@Param('productId') productId: string, @Body() dto: UpdateStockDto) {
    return this.inventoryService.updateStock(productId, dto);
  }
}
