import { Controller } from '@nestjs/common';
import { PresenceService } from './presence.service';
import { MessagePattern, Ctx, RmqContext } from '@nestjs/microservices';
import { SharedService } from '@/shared';

@Controller()
export class PresenceController {
  constructor(
    private readonly presenceService: PresenceService,
    private readonly sharedService: SharedService,
  ) {}

  @MessagePattern({ cmd: 'get-presence' })
  async getPresence(@Ctx() context: RmqContext) {
    this.sharedService.acknowledgeMessage(context);

    return this.presenceService.getHello();
  }
}
