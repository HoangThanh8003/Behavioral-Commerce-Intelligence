import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PlaceOrderDto } from './dto/order.dto';

@Injectable()
export class OrdersRepository {
  constructor(private prisma: PrismaService) {}

  async createOrder(userId: string, dto: PlaceOrderDto, items: any[], totalAmount: number) {
    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    return this.prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          orderNumber,
          userId,
          totalAmount,
          ...dto,
          items: {
            create: items.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              unitPrice: item.product.price,
              totalPrice: Number(item.product.price) * item.quantity,
              productName: item.product.name,
              productSku: item.product.sku,
            })),
          },
        },
        include: { items: true },
      });

      return order;
    });
  }

  async findByUserId(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });
  }
}
