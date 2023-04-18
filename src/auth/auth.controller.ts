import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async loginUser(@Request() req): Promise<any> {
    return this.authService.generateToken(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async user(@Request() req): Promise<any> {
    return req.user;
  }
}
