import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TrackEventDto } from './dto/analytics.dto';

@Injectable()
export class AnalyticsRepository {
  constructor(private prisma: PrismaService) {}

  async createEvent(userId: string, dto: TrackEventDto) {
    return this.prisma.userEvent.create({
      data: {
        userId,
        type: dto.type,
        payload: dto.payload,
      },
    });
  }

  async getPersona(userId: string) {
    return this.prisma.userPersona.findFirst({
      where: { userId },
    });
  }

  async updatePersona(userId: string, traits: any) {
    return this.prisma.userPersona.upsert({
      where: { id: userId }, // Assuming we use userId or a unique ID
      update: { traits },
      create: { userId, traits },
    });
  }

  async getUserEvents(userId: string) {
    return this.prisma.userEvent.findMany({
      where: { userId },
      orderBy: { timestamp: 'desc' },
      take: 50,
    });
  }
}
