import { Controller, UseInterceptors } from '@nestjs/common';
import { PresenceService } from './presence.service';
import { MessagePattern, Ctx, RmqContext } from '@nestjs/microservices';
import { RedisCacheService, SharedService } from '@/shared';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller()
export class PresenceController {
  constructor(
    private readonly redisCacheService: RedisCacheService,
    private readonly presenceService: PresenceService,
    private readonly sharedService: SharedService,
  ) {}

  @MessagePattern({ cmd: 'get-presence' })
  @UseInterceptors(CacheInterceptor)
  async getFoo(@Ctx() context: RmqContext) {
    this.sharedService.acknowledgeMessage(context);

    const foo = await this.redisCacheService.get('foo');

    if (foo) {
      console.log('Cached');

      return foo;
    }

    const f = await this.presenceService.getFoo();

    this.redisCacheService.set({ key: 'foo', value: f, ttl: 2000 });

    return f;
  }
}
