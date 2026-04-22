import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CartsService } from './carts.service';
import { AddToCartDto, UpdateCartItemDto } from './dto/cart.dto';

@ApiTags('Carts')
@ApiBearerAuth()
@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get('me')
  @ApiOperation({ summary: 'Lấy giỏ hàng hiện tại của user' })
  getCart(@Request() req: any) {
    // Placeholder userId, sẽ thay bằng req.user.id khi có AuthGuard
    const userId = req.user?.id || 'mock-user-id';
    return this.cartsService.getActiveCart(userId);
  }

  @Post('items')
  @ApiOperation({ summary: 'Thêm sản phẩm vào giỏ hàng' })
  addItem(@Request() req: any, @Body() dto: AddToCartDto) {
    const userId = req.user?.id || 'mock-user-id';
    return this.cartsService.addToCart(userId, dto);
  }

  @Patch('items/:itemId')
  @ApiOperation({ summary: 'Cập nhật số lượng item' })
  updateItem(@Request() req: any, @Param('itemId') itemId: string, @Body() dto: UpdateCartItemDto) {
    const userId = req.user?.id || 'mock-user-id';
    return this.cartsService.updateItem(userId, itemId, dto);
  }

  @Delete('items/:itemId')
  @ApiOperation({ summary: 'Xóa item khỏi giỏ hàng' })
  removeItem(@Request() req: any, @Param('itemId') itemId: string) {
    const userId = req.user?.id || 'mock-user-id';
    return this.cartsService.removeItem(userId, itemId);
  }
}
