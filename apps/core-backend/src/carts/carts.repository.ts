import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AddToCartDto, UpdateCartItemDto } from './dto/cart.dto';

@Injectable()
export class CartsRepository {
  constructor(private prisma: PrismaService) {}

  async findActiveCartByUserId(userId: string) {
    return this.prisma.cart.findFirst({
      where: { userId, isActive: true },
      include: { 
        items: {
          include: { product: true }
        }
      },
    });
  }

  async createCart(userId: string) {
    return this.prisma.cart.create({
      data: { userId, isActive: true },
    });
  }

  async addItem(cartId: string, dto: AddToCartDto, priceAtAdd: number) {
    return this.prisma.cartItem.upsert({
      where: {
        cartId_productId: { cartId, productId: dto.productId },
      },
      update: {
        quantity: { increment: dto.quantity },
      },
      create: {
        cartId,
        productId: dto.productId,
        quantity: dto.quantity,
        priceAtAdd,
      },
    });
  }

  async updateItem(itemId: string, dto: UpdateCartItemDto) {
    return this.prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity: dto.quantity },
    });
  }

  async removeItem(itemId: string) {
    return this.prisma.cartItem.delete({
      where: { id: itemId },
    });
  }

  async clearCart(cartId: string) {
    return this.prisma.cartItem.deleteMany({
      where: { cartId },
    });
  }
}
