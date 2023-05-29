import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { config } from 'dotenv';
import { join } from 'path';
config();

export const mailerOptions: MailerOptions = {
  transport: {
    host: process.env.MAILER_HOST,
    auth: {
      user: process.env.MAILER_USERNAME,
      pass: process.env.MAILER_PASSWORD,
    },
    defaults: {
      from: '"No Reply" <noreply@example.com>',
    },
  },
  template: {
    dir: join(__dirname, '..', '..', 'templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};
