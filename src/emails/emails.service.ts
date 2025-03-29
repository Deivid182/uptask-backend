import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { envs } from '../config';

@Injectable()
export class EmailsService {
  constructor(private readonly mailerService: MailerService) {}

  async sendVerifyEmail(email: string, name: string, token: string)  {
    await this.mailerService.sendMail({
      from: 'Uptask <admin@uptask.com>',
      to: email,
      subject: 'Welcome to Uptask',
      text: `Uptask - Verify your email address`,
      html: `
        <p>
          Hello, ${name}, you have signed up on Uptask, now you have to verify your email address.
        </p>
        <p>Click the following link: </p>
        <a href="${envs.FRONTEND_URL}/auth/verify">Verify email</a>
        <p>And enter the following token: ${token}</p>
        <p>This link will expire in 5 minutes.</p>
      `
    })
  }

  async sendPasswordResetToken(email: string, name: string, token: string)  {
    await this.mailerService.sendMail({
      from: 'UpTask <admin@uptask.com>',
      to: email,
      subject: 'UpTask - Reestablece tu password',
      text: 'UpTask - Reestablece tu password',
      html: `<p>Hola: ${name}, has solicitado reestablecer tu password.</p>
        <p>Visita el siguiente enlace:</p>
        <a href="${envs.FRONTEND_URL}/auth/new-password">Reestablecer Password</a>
        <p>E ingresa el código: <b>${token}</b></p>
        <p>Este token expira en 10 minutos</p>
      `
    })
  }
}
