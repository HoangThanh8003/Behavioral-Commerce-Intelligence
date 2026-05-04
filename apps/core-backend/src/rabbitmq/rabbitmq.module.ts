import { Module, Global } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';

/**
 * Global RabbitMQ module — available to all other modules without explicit import.
 */
@Global()
@Module({
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}
