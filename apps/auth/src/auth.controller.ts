import { Controller, Inject, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { SharedService } from '@/shared';
import { ExistingUserDTO, NewUserDTO } from './dto';
import { JwtGuard } from './jwt.guard';

@Controller()
export class AuthController {
  constructor(
    @Inject('AuthServiceInterface')
    private readonly authService: AuthService,
    @Inject('SharedServiceInterface')
    private readonly sharedService: SharedService,
  ) {}

  @MessagePattern({ cmd: 'get-users' })
  async getUser(@Ctx() context: RmqContext) {
    this.sharedService.acknowledgeMessage(context);

    return this.authService.getUsers();
  }

  @MessagePattern({ cmd: 'register' })
  async register(@Ctx() context: RmqContext, @Payload() newUser: NewUserDTO) {
    this.sharedService.acknowledgeMessage(context);

    return this.authService.register(newUser);
  }

  @MessagePattern({ cmd: 'login' })
  async login(@Ctx() context: RmqContext, @Payload() user: ExistingUserDTO) {
    this.sharedService.acknowledgeMessage(context);

    return this.authService.login(user);
  }

  @MessagePattern({ cmd: 'verify-jwt' })
  @UseGuards(JwtGuard)
  async verifyJwt(
    @Ctx() context: RmqContext,
    @Payload() payload: { jwt: string },
  ) {
    this.sharedService.acknowledgeMessage(context);

    return this.authService.verifyJwt(payload.jwt);
  }

  @MessagePattern({ cmd: 'decode-jwt' })
  async decodeJwt(
    @Ctx() context: RmqContext,
    @Payload() payload: { jwt: string },
  ) {
    this.sharedService.acknowledgeMessage(context);

    return this.authService.getUserFromHeader(payload.jwt);
  }

  @MessagePattern({ cmd: 'add-friend' })
  async addFriend(
    @Ctx() context: RmqContext,
    @Payload() payload: { userId: number; friendId: number },
  ) {
    this.sharedService.acknowledgeMessage(context);

    return this.authService.addFriend(payload.userId, payload.friendId);
  }

  @MessagePattern({ cmd: 'get-friends' })
  async getFriends(
    @Ctx() context: RmqContext,
    @Payload() payload: { userId: number },
  ) {
    this.sharedService.acknowledgeMessage(context);

    return this.authService.getFriends(payload.userId);
  }

  @MessagePattern({ cmd: 'get-friends-list' })
  async getFriendsList(
    @Ctx() context: RmqContext,
    @Payload() payload: { userId: number },
  ) {
    this.sharedService.acknowledgeMessage(context);

    return this.authService.getFriendsList(payload.userId);
  }
}
