import { Controller, Get } from '@nestjs/common';
import { PresenceService } from './presence.service';
import { MessagePattern, Ctx, RmqContext } from '@nestjs/microservices';
import { SharedService } from '@/shared';
import { AuthGuard } from '@/shared/auth.guard';

@Controller()
export class PresenceController {
  constructor(
    private readonly presenceService: PresenceService,
    private readonly sharedService: SharedService,

    // Temp
    private readonly authGuard: AuthGuard,
  ) {}

  @MessagePattern({ cmd: 'get-presence' })
  async getPresence(@Ctx() context: RmqContext) {
    this.sharedService.acknowledgeMessage(context);

    // Temp
    console.log({ jwt: this.authGuard.hasJwt() });
    return this.presenceService.getHello();
  }
}
