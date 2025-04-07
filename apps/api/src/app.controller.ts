import { Controller, Get, Inject, Post } from '@nestjs/common';
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

  @Get('presence')
  async persenceUses() {
    return this.persenceService.send({ cmd: 'get-presence' }, {});
  }
}
