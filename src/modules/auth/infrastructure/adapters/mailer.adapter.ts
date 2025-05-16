import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { IMailerPort } from 'src/modules/auth/application/ports/i-mailer.port'; 

@Injectable()
export class MailerAdapter implements IMailerPort {
  private readonly log = new Logger('Mailer');
  private readonly transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  async sendPasswordReset(to: string, link: string): Promise<void> {
    await this.transporter.sendMail({
      to,
      subject: 'Restablece tu contraseña',
      html: `<p>Haz clic en <a href="${link}">este enlace</a> para restablecer tu contraseña (válido 2 h).</p>`,
    });
    this.log.debug(`Password-reset mail sent to ${to}`);
  }
}
