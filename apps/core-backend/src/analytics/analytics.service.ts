import { Injectable } from '@nestjs/common';
import { AnalyticsRepository } from './analytics.repository';
import { TrackEventDto } from './dto/analytics.dto';

@Injectable()
export class AnalyticsService {
  constructor(private repository: AnalyticsRepository) {}

  async track(userId: string, dto: TrackEventDto) {
    const event = await this.repository.createEvent(userId, dto);
    
    // ⚡ Event: user.event_tracked -> AI Worker sẽ bắt đầu phân tích để cập nhật Persona
    // TODO: Emit event via BullMQ
    
    return event;
  }

  async getPersona(userId: string) {
    return this.repository.getPersona(userId);
  }

  async getMyActivity(userId: string) {
    return this.repository.getUserEvents(userId);
  }
}
