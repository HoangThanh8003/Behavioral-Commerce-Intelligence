import { Controller, Post, Body, Req, Logger, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { MoMoService } from './momo.service';

export class CreatePaymentDto {
  amount: number;
  orderId?: string;
}

// In-memory status tracker for local development polling
const paymentStatusMap = new Map<string, string>();

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  private readonly logger = new Logger(PaymentController.name);

  constructor(private readonly momoService: MoMoService) {}

  @Post('momo/create')
  @ApiOperation({ summary: 'Tạo URL thanh toán MoMo' })
  async createMoMoPayment(@Body() dto: CreatePaymentDto) {
    const orderId = dto.orderId || `ZENTO_${new Date().getTime()}`;
    const orderInfo = `Thanh toan don hang ${orderId} tren ZENTO`;
    
    // Set initial status to UNPAID
    paymentStatusMap.set(orderId, 'UNPAID');
    
    const payUrl = await this.momoService.createPayment(dto.amount, orderId, orderInfo);
    return { payUrl, orderId };
  }

  @Get('momo/status/:orderId')
  @ApiOperation({ summary: 'Kiểm tra trạng thái thanh toán MoMo' })
  @ApiParam({ name: 'orderId', type: 'string' })
  async getPaymentStatus(@Param('orderId') orderId: string) {
    const status = paymentStatusMap.get(orderId) || 'UNPAID';
    return { status };
  }

  @Post('momo/mock-ipn')
  @ApiOperation({ summary: '(DEV ONLY) Giả lập MoMo IPN gửi về khi thanh toán thành công' })
  async simulateMoMoIpn(@Body() dto: { orderId: string }) {
    this.logger.log(`Simulating successful MoMo payment for order: ${dto.orderId}`);
    paymentStatusMap.set(dto.orderId, 'PAID');
    // Trong thực tế, lúc này sẽ gọi OrdersService để update status trong DB
    return { status: 'PAID', message: 'Simulated IPN received successfully' };
  }

  @Post('momo/ipn')
  @ApiOperation({ summary: 'Webhook nhận kết quả thanh toán từ MoMo' })
  async handleMoMoIpn(@Req() req: any) {
    this.logger.log('Received IPN from MoMo:');
    this.logger.log(req.body);
    
    if (req.body && req.body.resultCode === 0 && req.body.orderId) {
       paymentStatusMap.set(req.body.orderId, 'PAID');
       this.logger.log(`Order ${req.body.orderId} marked as PAID via real IPN.`);
    }
    
    return { status: 'ok' };
  }
}

