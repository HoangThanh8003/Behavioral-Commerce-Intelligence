import { Injectable, BadRequestException } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CartsService } from '../carts/carts.service';
import { PlaceOrderDto } from './dto/order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private repository: OrdersRepository,
    private cartsService: CartsService
  ) {}

  async placeOrder(userId: string, dto: PlaceOrderDto) {
    const cart = await this.cartsService.getActiveCart(userId);
    if (!cart.items || cart.items.length === 0) {
      throw new BadRequestException('Giỏ hàng trống');
    }

    // Calculate total
    const totalAmount = cart.items.reduce((sum, item) => {
      return sum + Number(item.product.price) * item.quantity;
    }, 0);

    // Create Order
    const order = await this.repository.createOrder(userId, dto, cart.items, totalAmount);

    // TODO: Emit event 'order.placed' -> Worker sẽ xử lý trừ kho và thanh toán
    // Clear cart (soft delete or deactivate)
    // For now, we just clear items
    // In production, we would deactivate the cart

    return order;
  }

  async getMyOrders(userId: string) {
    return this.repository.findByUserId(userId);
  }

  async getOrderDetail(orderId: string) {
    return this.repository.findById(orderId);
  }
}
