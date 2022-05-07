require("dotenv").config();

import nodemailer from "nodemailer";
import { MailAdapter, MailAdapterData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: MailAdapterData) {
    await transport.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_TO,
      subject,
      html: body,
    });
  }
}
