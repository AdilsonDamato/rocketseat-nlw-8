import nodemailer from "nodemailer";
import { MailAdapter, MailAdapterData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "038b4218dc57db",
    pass: "e38aea115778a3",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: MailAdapterData) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Adilson Pereira <adilson@adilsonpereira.com.br>",
      subject,
      html: body,
    });
  }
}
