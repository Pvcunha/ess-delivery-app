import { createTransport } from 'nodemailer'

interface MailTo {
    name: string;
    email: string;
}

interface MailMessage {
    subject: string;
    body: string;
}

interface IMail {
    to: MailTo;
    message: MailMessage;
}

class EmailService {

    transporter = createTransport({
        host: 'smtp.freesmtpservers.com',
        port: 25,
    });
    private isOn: boolean = true;
    private waitingMails: IMail[] = [];

    private async sendWaiting() {
        while (this.waitingMails.length > 0 && this.isOn) {
            let sndMail = this.waitingMails.shift();
            this.transporter.sendMail({
                from: 'group5@ess.com',
                to: sndMail.to.email,
                subject: sndMail.message.subject,
                text: sndMail.message.body,
                html: sndMail.message.body
            })
                .then(
                    (info) => console.log(`delayed message sent to ${sndMail.to}`),
                    (info) => { console.log(`server is down`); this.waitingMails.push(sndMail); this.isOn = false })
                .catch(err => console.log(err));
        }
    }

    async sendMail(mail: IMail) {

        console.log(`\n\nsending email to: ${mail.to.email}`);
        const info = await this.transporter.sendMail({
            from: 'group5@ess.com',
            to: mail.to.email,
            subject: mail.message.subject,
            text: mail.message.body,
            html: mail.message.body
        });

        //console.log('>', info.response, info.rejected)
        if (info.response != '250 OK') {
            this.isOn = false;
            this.waitingMails.push(mail);
        }

        if (info.accepted) {
            console.log(`Response from e-mail API: ${info.response}`);
            this.isOn = true;
            if (this.waitingMails.length > 0) {
                this.sendWaiting();
            }
        }

        // DEBUG
        console.log("CONTEÚDO DO E-MAIL ENVIADO:\n" + mail.message.body)

        return info;
    }
}

export default EmailService;