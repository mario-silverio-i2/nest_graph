import { HelperModule } from './helper/helper.module';
import { Module } from '@nestjs/common';
import { AnalyticsModule } from './module/analytics.module';

@Module({
  imports: [AnalyticsModule, HelperModule],
  providers: [],
})
export class AppModule {}
