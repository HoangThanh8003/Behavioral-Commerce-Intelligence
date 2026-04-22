import { Controller, Get, Post, Body, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { TrackEventDto } from './dto/analytics.dto';

@ApiTags('Analytics')
@ApiBearerAuth()
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('track')
  @ApiOperation({ summary: 'Ghi lại hành vi người dùng' })
  track(@Request() req: any, @Body() dto: TrackEventDto) {
    const userId = req.user?.id || 'mock-user-id';
    return this.analyticsService.track(userId, dto);
  }

  @Get('persona')
  @ApiOperation({ summary: 'Lấy đặc điểm AI của tôi' })
  getPersona(@Request() req: any) {
    const userId = req.user?.id || 'mock-user-id';
    return this.analyticsService.getPersona(userId);
  }

  @Get('activity')
  @ApiOperation({ summary: 'Xem lịch sử hoạt động của tôi' })
  getActivity(@Request() req: any) {
    const userId = req.user?.id || 'mock-user-id';
    return this.analyticsService.getMyActivity(userId);
  }
}
