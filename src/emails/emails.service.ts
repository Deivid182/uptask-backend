import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { envs } from '../config';

@Injectable()
export class EmailsService {
  constructor(private readonly mailerService: MailerService) {}

  async sendVerifyEmail(email: string, name: string, token: string)  {
    await this.mailerService.sendMail({
      from: 'Uptask <L1bM0@example.com>',
      to: email,
      subject: 'Welcome to Uptask',
      text: `Uptask - Verify your email address`,
      html: `
        <p>
          Hello, ${name}, you have signed up on Uptask, now you have to verify your email address.
        </p>
        <p>Click the following link: </p>
        <a href="${envs.FRONTEND_URL}/verify/">Verify email</a>
        <p>And enter the following token: ${token}</p>
        <p>This link will expire in 5 minutes.</p>
      `
    })
  }
}
