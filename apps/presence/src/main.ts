import { NestFactory } from '@nestjs/core';
import { PresenceModule } from './presence.module';
import { SharedService } from '@/shared';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(PresenceModule, { cors: true });
  // app.enableCors();

  const configService = app.get(ConfigService);
  const sharedService = app.get(SharedService);

  const queue = configService.get('RABBITMQ_PRESENCE_QUEUE');

  app.connectMicroservice(sharedService.getRmqOptions(queue));
  app.startAllMicroservices();

  await app.listen(6000);
}
bootstrap();
