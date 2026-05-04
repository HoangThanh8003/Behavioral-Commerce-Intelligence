import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class MoMoService {
  private readonly logger = new Logger(MoMoService.name);

  // Load from environment variables (or use defaults for testing)
  private readonly partnerCode = process.env.MOMO_PARTNER_CODE || 'MOMO';
  private readonly accessKey = process.env.MOMO_ACCESS_KEY || 'F8BBA842ECF85';
  private readonly secretKey = process.env.MOMO_SECRET_KEY || 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
  private readonly endpoint = 'https://test-payment.momo.vn/v2/gateway/api/create';

  async createPayment(amount: number, orderId: string, orderInfo: string): Promise<string> {
    const redirectUrl = process.env.MOMO_REDIRECT_URL || 'http://localhost:3000/cart/success';
    const ipnUrl = process.env.MOMO_IPN_URL || 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
    const requestType = "payWithMethod";
    const requestId = orderId;
    const extraData = '';
    const orderGroupId = '';
    const autoCapture = true;
    const lang = 'vi';

    // Construct raw signature string
    const rawSignature = 
      `accessKey=${this.accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${this.partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

    this.logger.debug(`Raw Signature: ${rawSignature}`);

    // Generate HMAC SHA256 signature
    const signature = crypto
      .createHmac('sha256', this.secretKey)
      .update(rawSignature)
      .digest('hex');

    const requestBody = {
      partnerCode: this.partnerCode,
      partnerName: "Test",
      storeId: "MomoTestStore",
      requestId: requestId,
      amount: amount.toString(),
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      lang: lang,
      requestType: requestType,
      autoCapture: autoCapture,
      extraData: extraData,
      orderGroupId: orderGroupId,
      signature: signature
    };

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();
      
      this.logger.debug(`MoMo Response: ${JSON.stringify(responseData)}`);

      if (responseData.resultCode === 0) {
        return responseData.payUrl;
      } else {
        this.logger.error(`MoMo Error: ${responseData.message}`);
        throw new InternalServerErrorException(`MoMo Error: ${responseData.message}`);
      }
    } catch (error) {
      this.logger.error(`Failed to create MoMo payment: ${error}`);
      throw new InternalServerErrorException('Payment gateway error');
    }
  }
}
