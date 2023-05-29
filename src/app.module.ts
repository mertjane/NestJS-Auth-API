import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { AuthModule } from './auth/auth.module';
import { mailerOptions } from './config/mailer.config';
import { EmailController } from './mailer/email.controller';
import { config } from 'dotenv';
import { EmailModule } from './mailer/email.module';

config();

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    MailerModule.forRoot(mailerOptions),
    UserModule,
    AuthModule,
    EmailModule,
  ],
  controllers: [EmailController],
})
export class AppModule {}
