import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable, Inject } from '@nestjs/common';

import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get(key: string) {
    console.log(`Get ${key} from redis`);
    return await this.cache.get(key);
  }

  async set({
    key,
    value,
    ttl = 0,
  }: {
    key: string;
    value: unknown;
    ttl?: number;
  }) {
    console.log(`Set ${key} from redis`);

    await this.cache.set(key, value, ttl);
  }

  async del(key: string) {
    console.log(`Del ${key} from redis`);

    await this.cache.del(key);
  }

  async reset() {
    console.log(`Reset redis`);

    await this.cache.clear();
  }
}
