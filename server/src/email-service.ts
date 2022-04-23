import { createTransport } from 'nodemailer'

interface MailTo {
    name: string;
    email: string;
}

interface MailMessage {
    subject: string;
    body: string;
}
class EmailService {
    
    transporter = createTransport({
        host:'smtp.freesmtpservers.com',
        port: 25,        
    });

    async sendMail(to: MailTo, message: MailMessage) {
        
        console.log(`sending email to: ${to.email}`);
        const info = await this.transporter.sendMail({
            from: 'group5@ess.com',
            to: to.email,
            subject: message.subject,
            text: message.body,
            html: message.body
        });
       
        console.log(`Message sent: ${info.response}`);
        return info;
    }
}

export default EmailService;