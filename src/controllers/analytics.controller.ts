import { ApiAuthGuard } from '../auth/api-auth.guard';
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AnalyticsService } from '../services/analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('mockdata')
  @UseGuards(ApiAuthGuard)
  async getMockData(): Promise<any> {
    return this.analyticsService.getMockData();
  }

  @Get('mockdata/table')
  @UseGuards(ApiAuthGuard)
  async getMockDataTable(): Promise<any> {
    return this.analyticsService.getMockDataTable();
  }

  @Post('mockdata')
  async findByFilter(@Body() filterCriteria: Promise<any>) {
    return `Filtrando dados com os seguintes critérios: ${JSON.stringify(filterCriteria)}`;
  }
}
