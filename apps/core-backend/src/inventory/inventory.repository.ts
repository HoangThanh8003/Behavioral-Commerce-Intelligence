import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateStockDto, CreateInventoryDto } from './dto/inventory.dto';

@Injectable()
export class InventoryRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateInventoryDto) {
    return this.prisma.inventory.create({ data });
  }

  async findByProductId(productId: string) {
    return this.prisma.inventory.findUnique({
      where: { productId },
      include: { logs: { take: 10, orderBy: { createdAt: 'desc' } } },
    });
  }

  async updateStock(productId: string, dto: UpdateStockDto) {
    const { action, quantity, note } = dto;
    
    // Sử dụng Transaction để đảm bảo tính toàn vẹn giữa Inventory và Log
    return this.prisma.$transaction(async (tx) => {
      const inventory = await tx.inventory.findUnique({ where: { productId } });
      if (!inventory) throw new Error('Inventory record not found');

      let newQuantity = inventory.quantity;
      if (action === 'RESTOCK' || action === 'RETURN') {
        newQuantity += quantity;
      } else {
        newQuantity -= quantity;
      }

      const updatedInventory = await tx.inventory.update({
        where: { productId },
        data: { quantity: newQuantity },
      });

      await tx.inventoryLog.create({
        data: {
          inventoryId: inventory.id,
          action,
          quantity,
          note,
        },
      });

      return updatedInventory;
    });
  }
}
