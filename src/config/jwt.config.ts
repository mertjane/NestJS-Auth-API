import { appConfig } from 'src/config/app.config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleAsyncOptions = {
  useFactory: () => {
    return {
      secret: appConfig.secret,
      signOptions: { expiresIn: '1d' },
    };
  },
};
