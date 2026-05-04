import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CartsService } from './carts.service';
import { AddToCartDto, UpdateCartItemDto } from './dto/cart.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Carts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get('me')
  @ApiOperation({ summary: 'Lấy giỏ hàng hiện tại của user' })
  getCart(@Request() req: any) {
    return this.cartsService.getActiveCart(req.user.id);
  }

  @Post('items')
  @ApiOperation({ summary: 'Thêm sản phẩm vào giỏ hàng' })
  addItem(@Request() req: any, @Body() dto: AddToCartDto) {
    return this.cartsService.addToCart(req.user.id, dto);
  }

  @Patch('items/:itemId')
  @ApiOperation({ summary: 'Cập nhật số lượng item' })
  updateItem(@Request() req: any, @Param('itemId') itemId: string, @Body() dto: UpdateCartItemDto) {
    return this.cartsService.updateItem(req.user.id, itemId, dto);
  }

  @Delete('items/:itemId')
  @ApiOperation({ summary: 'Xóa item khỏi giỏ hàng' })
  removeItem(@Request() req: any, @Param('itemId') itemId: string) {
    return this.cartsService.removeItem(req.user.id, itemId);
  }
}
