import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { InventoryRepository } from './inventory.repository';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [InventoryController],
  providers: [InventoryService, InventoryRepository, PrismaService],
  exports: [InventoryService],
})
export class InventoryModule {}
