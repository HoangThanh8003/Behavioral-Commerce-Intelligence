import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { PlaceOrderDto } from './dto/order.dto';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Đặt hàng từ giỏ hàng hiện tại' })
  placeOrder(@Request() req: any, @Body() dto: PlaceOrderDto) {
    const userId = req.user?.id || 'mock-user-id';
    return this.ordersService.placeOrder(userId, dto);
  }

  @Get('me')
  @ApiOperation({ summary: 'Lấy danh sách đơn hàng của tôi' })
  getMyOrders(@Request() req: any) {
    const userId = req.user?.id || 'mock-user-id';
    return this.ordersService.getMyOrders(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Chi tiết đơn hàng' })
  getDetail(@Param('id') id: string) {
    return this.ordersService.getOrderDetail(id);
  }
}
