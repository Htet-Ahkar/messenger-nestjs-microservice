import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard, SharedModule } from '@/shared';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),

    SharedModule.registerRmq(
      'AUTH_SERVICE',
      process.env.RABBITMQ_AUTH_QUEUE || '',
    ),
    SharedModule.registerRmq(
      'PRESENCE_SERVICE',
      process.env.RABBITMQ_PRESENCE_QUEUE || '',
    ),
  ],
  controllers: [AppController],
  providers: [AuthGuard],
})
export class AppModule {}
