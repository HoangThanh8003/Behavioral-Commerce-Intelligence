import { Controller, Get, Post, Body, Param, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { PlaceOrderDto } from './dto/order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Orders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Đặt hàng từ giỏ hàng hiện tại' })
  placeOrder(@Request() req: any, @Body() dto: PlaceOrderDto) {
    return this.ordersService.placeOrder(req.user.id, dto);
  }

  @Get('me')
  @ApiOperation({ summary: 'Lấy danh sách đơn hàng của tôi' })
  getMyOrders(@Request() req: any) {
    return this.ordersService.getMyOrders(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Chi tiết đơn hàng' })
  getDetail(@Param('id') id: string) {
    return this.ordersService.getOrderDetail(id);
  }
}
