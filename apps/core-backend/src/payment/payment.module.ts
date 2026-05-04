import { Module } from '@nestjs/common';
import { MoMoService } from './momo.service';
import { PaymentController } from './payment.controller';

@Module({
  controllers: [PaymentController],
  providers: [MoMoService],
  exports: [MoMoService],
})
export class PaymentModule {}
