import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { Keyv } from 'keyv';
import { RedisCacheService } from '../services';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        store: new Keyv(configService.get('REDIS_URI'), { ttl: 60000 }), //! Global ttl does not work
      }),
      isGlobal: true,
      inject: [ConfigService],
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisModule {}
