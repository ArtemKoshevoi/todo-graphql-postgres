import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [CoreModule, SharedModule],
})
export class AppModule {}
