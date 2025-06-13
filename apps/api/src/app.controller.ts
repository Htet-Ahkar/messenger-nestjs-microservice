import { AuthGuard, UserInterceptor, UserRequest } from '@/shared';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private authService: ClientProxy,
    @Inject('PRESENCE_SERVICE') private persenceService: ClientProxy,
  ) {}

  // Note: This would be done already from the main Facebook App thus simple end point provided to simplify this process.
  @UseGuards(AuthGuard)
  @UseInterceptors(UserInterceptor) //* Can be replaced by decorator?
  @Post('add-friend/:friendId')
  async addFriend(
    @Req() req: UserRequest,
    @Param('friendId') friendId: number,
  ) {
    if (!req?.user) {
      throw new BadRequestException();
    }
    return this.authService.send(
      {
        cmd: 'add-friend',
      },
      {
        userId: req.user.id,
        friendId,
      },
    );
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(UserInterceptor)
  @Get('get-friends')
  async getFriends(@Req() req: UserRequest) {
    if (!req?.user) {
      throw new BadRequestException();
    }

    return this.authService.send(
      {
        cmd: 'get-friends',
      },
      {
        userId: req.user.id,
      },
    );
  }

  @Get('auth')
  async getUses() {
    return this.authService.send({ cmd: 'get-users' }, {});
  }

  @Post('auth')
  async postUser() {
    return this.authService.send({ cmd: 'post-user' }, {});
  }

  @UseGuards(AuthGuard)
  @Get('presence')
  async persenceUses() {
    return this.persenceService.send({ cmd: 'get-presence' }, {});
  }

  @Post('auth/register')
  async register(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.send(
      { cmd: 'register' },
      {
        firstName,
        lastName,
        email,
        password,
      },
    );
  }

  @Post('auth/login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.send(
      { cmd: 'login' },
      {
        email,
        password,
      },
    );
  }
}
