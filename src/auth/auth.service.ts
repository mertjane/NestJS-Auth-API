import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUserCreds(email: string, password: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);

    if (!user) throw new BadRequestException();

    if (!(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException();

    return user;
  }

  async generateToken(user: any) {
    return {
      access_token: this.jwtService.sign({
        username: user.username,
        email: user.email,
        sub: user.id,
      }),
    };
  }
}
