import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { MyLogger } from './modules/logger/my-logger.service';
import { RolesGuard } from './modules/shared/guards/roles.guard';
import { SharedModule } from './modules/shared/shared.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const rolesGuard = app.select(SharedModule).get(RolesGuard);
  app.useGlobalGuards(rolesGuard);

  app.useLogger(new MyLogger());
  await app.listen(3000);
}
bootstrap();
