import { AuthGuard } from '@/shared';
import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private authService: ClientProxy,
    @Inject('PRESENCE_SERVICE') private persenceService: ClientProxy,
  ) {}

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
