import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { ConfigService } from '../config/config.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) { }

  @Post('login')
  signIn(@Body() body: AuthDto) {
    return this.authService.signIn(body.username, body.password);
  }

  @Get('/settings')
  getSettings() {
    return this.configService.uiSettings();
  }

  @Post('/noauth')
  getToken() {
    return this.authService.generateNoAuthToken();
  }

  @UseGuards(AuthGuard())
  @Get('/check')
  checkAuth() {
    return { status: 'OK' };
  }

}
