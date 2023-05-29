import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
config();

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendConfirmationEmail(
    username: string,
    email: string,
    { access_token }: { access_token: string },
  ) {
    try {
      // const frontendURL = process.env.FRONTEND_URL;&redirectUrl=${frontendURL}
      const confirmationLink = `${process.env.CONFIRMATION_LINK_URL}/${access_token}`;
      await this.mailerService.sendMail({
        to: email,
        from: `${process.env.SENDER_MAIL}`,
        subject: 'Email Confirmation',
        template: 'email_confirm',
        context: {
          confirmationLink,
          username,
        },
      });
      return 'success';
    } catch (error) {
      console.log(error);
      return 'error';
    }
  }
}
