import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { MyLogger } from './modules/logger/my-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(new MyLogger());
  await app.listen(3000);
}
bootstrap();
