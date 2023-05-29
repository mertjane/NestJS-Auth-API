import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  BadRequestException,
  Redirect,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Controller('email')
export class EmailController {
  constructor(
    private readonly emailService: EmailService,
    private readonly userService: UserService,
  ) {}

  @Post('html-email')
  async sendConfirmationEmail(
    @Body() payload: { username: string; email: string; access_token: string },
  ) {
    const { username, email, access_token } = payload;
    await this.emailService.sendConfirmationEmail(username, email, {
      access_token,
    });

    return 'success';
  }

  @Get('confirm-email/:access_token')
  @Redirect('http://localhost:3000/verified')
  async confirmEmail(@Param('access_token') email: string): Promise<User> {
    const user = await this.userService.getUserByConfirmationToken(email);

    if (!user) {
      throw new BadRequestException('Invalid token');
    }

    user.isEmailConfirmed = true;

    const updatedUser = await this.userService.updateUser(user.id, user);

    return updatedUser;
  }
}

/*
  @Get('get-email')
  @Render('test')
  getEmail() {
    const payload = { url: 'John Doe' }; // Example payload
    return { payload };
  }
} */
