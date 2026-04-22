import { Injectable, NotFoundException } from '@nestjs/common';
import { CartsRepository } from './carts.repository';
import { PrismaService } from '../prisma.service';
import { AddToCartDto, UpdateCartItemDto } from './dto/cart.dto';

@Injectable()
export class CartsService {
  constructor(
    private repository: CartsRepository,
    private prisma: PrismaService
  ) {}

  async getActiveCart(userId: string) {
    let cart = await this.repository.findActiveCartByUserId(userId);
    if (!cart) {
      cart = await this.repository.createCart(userId) as any;
    }
    return cart;
  }

  async addToCart(userId: string, dto: AddToCartDto) {
    const cart = await this.getActiveCart(userId);
    
    // Get current product price
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
    });
    if (!product) throw new NotFoundException('Product not found');

    return this.repository.addItem(cart.id, dto, Number(product.price));
  }

  async updateItem(userId: string, itemId: string, dto: UpdateCartItemDto) {
    // Basic validation could be added to ensure item belongs to user's cart
    return this.repository.updateItem(itemId, dto);
  }

  async removeItem(userId: string, itemId: string) {
    return this.repository.removeItem(itemId);
  }
}
