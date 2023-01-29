import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(
    @Req()
    req: Request,
    @Res({ passthrough: true })
    res: Response,
  ) {
    const { accessToken } = await this.authService.login(req.user);
    res.cookie('accessToken', accessToken, { httpOnly: true });
    return true;
  }
}
