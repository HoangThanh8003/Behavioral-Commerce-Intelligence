import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InventoryRepository } from './inventory.repository';
import { UpdateStockDto, CreateInventoryDto } from './dto/inventory.dto';

@Injectable()
export class InventoryService {
  constructor(private repository: InventoryRepository) {}

  async create(dto: CreateInventoryDto) {
    return this.repository.create(dto);
  }

  async getStatus(productId: string) {
    const inventory = await this.repository.findByProductId(productId);
    if (!inventory) throw new NotFoundException('Inventory not found');
    return inventory;
  }

  async updateStock(productId: string, dto: UpdateStockDto) {
    try {
      const result = await this.repository.updateStock(productId, dto);
      
      // Check for low stock alert
      if (result.quantity <= result.lowStockThreshold) {
        // TODO: Emit event 'inventory.low_stock'
      }

      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
