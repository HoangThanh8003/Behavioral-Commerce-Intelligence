import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { CartsRepository } from './carts.repository';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [CartsController],
  providers: [CartsService, CartsRepository, PrismaService],
  exports: [CartsService],
})
export class CartsModule {}
