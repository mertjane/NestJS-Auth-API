import { JwtService } from '@nestjs/jwt';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { REGEX } from 'src/utils/auth.utils';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUserCreds(
    usernameOrEmail: string,
    password: string,
  ): Promise<any> {
    let user;

    // check if the input is an email
    if (usernameOrEmail.includes('@')) {
      user = await this.userService.getUserByEmail(usernameOrEmail);
    } else {
      // assume input is a username
      user = await this.userService.findByUsername(usernameOrEmail);
    }

    if (!user) {
      throw new HttpException(
        REGEX.LOGIN_VALIDATION_MESSAGE,
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new HttpException(
        REGEX.LOGIN_VALIDATION_MESSAGE,
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }

  async generateToken(user: any) {
    const { id, username, email } = user;
    const payload = { id, username, email };
    const access_token = this.jwtService.sign(payload);
    return { access_token, ...payload };
  }
}
