import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { appConfig } from 'src/config/app.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: appConfig.secret,
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      username: payload.username,
      email: payload.email,
    };
  }
}
