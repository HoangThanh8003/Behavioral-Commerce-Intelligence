import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsRepository } from './analytics.repository';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [AnalyticsController],
  providers: [AnalyticsService, AnalyticsRepository, PrismaService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
