import { MailtrapTransport  } from "mailtrap";
import Nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()
const TOKEN = process.env.MAIL_TRAP_TOKEN;

export const client = Nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
  })
);

export const sender = {
  address: "hello@demomailtrap.com",
  name: "Mailtrap Test",
};
