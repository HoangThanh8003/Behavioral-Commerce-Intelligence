import { Injectable, Logger } from '@nestjs/common';
import { AnalyticsRepository } from './analytics.repository';
import { TrackEventDto } from './dto/analytics.dto';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';

@Injectable()
export class AnalyticsService {
  private readonly logger = new Logger(AnalyticsService.name);

  constructor(
    private repository: AnalyticsRepository,
    private rabbitMQService: RabbitMQService,
  ) {}

  async track(userId: string, dto: TrackEventDto) {
    const event = await this.repository.createEvent(userId, dto);
    
    // ⚡ Publish event to RabbitMQ → ai-brain consumes for persona classification
    const routingKey = `event.${dto.type.toLowerCase()}`;
    await this.rabbitMQService.publishEvent(
      routingKey,
      {
        eventId: event.id,
        userId,
        type: dto.type,
        payload: dto.payload,
        timestamp: event.timestamp,
      },
      event.id,
    );
    this.logger.debug(`Event published to RabbitMQ: ${routingKey}`);
    
    return event;
  }

  async getPersona(userId: string) {
    return this.repository.getPersona(userId);
  }

  async getMyActivity(userId: string) {
    return this.repository.getUserEvents(userId);
  }

  async getGlobalActivity(limit?: number) {
    return this.repository.getGlobalEvents(limit);
  }
}
