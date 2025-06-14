import { Module } from '@nestjs/common';

import { SharedModule, RedisModule } from '@/shared';

import { PresenceController } from './presence.controller';
import { PresenceService } from './presence.service';
import { PresenceGateway } from './presence.gateway';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    RedisModule,
    SharedModule.registerRmq(
      'AUTH_SERVICE',
      process.env.RABBITMQ_AUTH_QUEUE || '',
    ),
  ],
  controllers: [PresenceController],
  providers: [PresenceService, PresenceGateway],
})
export class PresenceModule {}
