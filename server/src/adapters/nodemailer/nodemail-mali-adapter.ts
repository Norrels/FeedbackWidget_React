import { MailAdapter, sendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
    user: "a05c6891ee7bb8",
    pass: "f7af229bc38f9c"
    }
});

export class NodemailerMailAdapter implements MailAdapter{
    async sendMail({subject, body}: sendMailData){
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget',
            to:  ' Matheus Costa <Matheuus412@gmail.com>',
            subject: subject,
            html: body
        });
    }
}