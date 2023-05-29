import { AuthService } from './../auth/auth.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SETTINGS } from 'src/utils/auth.utils';
import { User } from './entities/user.entity';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { EmailService } from 'src/mailer/email.service';

@ApiTags('User')
@Controller()
export class UserController {
  constructor(
    private userService: UserService,
    private readonly emailService: EmailService,
  ) {}

  @Post('/register')
  @ApiCreatedResponse({
    description: 'Created user object as response',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'User cannot register. Try again.',
  })
  async createUser(
    @Body(SETTINGS.VALIDATION_PIPE) createUserDto: CreateUserDto,
  ): Promise<any> {
    const user = await this.userService.createUser(createUserDto);
    const token = await this.userService.generateToken(user);

    await this.emailService.sendConfirmationEmail(
      user.username,
      user.email,
      token,
    );

    return {
      access_token: token.access_token,
      id: user.id,
      username: user.username,
      email: user.email,
      isEmailConfirmed: user.isEmailConfirmed,
      isCookiesConfirmed: user.isCookiesConfirmed,
    };
  }

  // check username already taken by input value
  @Get('/check-username')
  async checkUsernameTaken(
    @Query('username') username: string,
  ): Promise<{ usernameTaken: boolean }> {
    const user = await this.userService.findByUsername(username);
    return { usernameTaken: !!user };
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.userService.getUserById(+id);
    return {
      //access_token: user.access_token,
      id: user.id,
      username: user.username,
      email: user.email,
      isEmailConfirmed: user.isEmailConfirmed,
      isCookiesConfirmed: user.isCookiesConfirmed,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
