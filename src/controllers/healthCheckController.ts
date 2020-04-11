import { Request, Response } from 'express';
import { createTransport } from 'nodemailer';
import { getConfirmAccountTemplate } from '../helpers/html-templates/confirm-account';

export class HealthCheckController {

    public ping(_req: Request, res: Response) {
        res.json({
            message: "Pong"
        });
    }

    public sendEmail(_req: Request, res: Response) {
        const senderEmail = process.env.SENDER_EMAIL;
        const senderPassword = process.env.SENDER_PASSWORD;

        const fromMail = senderEmail;
        const toMail = senderEmail;
        const subject = 'Welcome to FbApp, Confirm Your Account!';
        const html = getConfirmAccountTemplate();

        // auth
        const transporter = createTransport({
            service: 'gmail',
            auth: {
                user: senderEmail,
                pass: senderPassword
            }
        });

        // email options
        let mailOptions = {
            from: fromMail,
            to: toMail,
            subject: subject,
            // text: text
            html
        };

        // send email
        transporter.sendMail(mailOptions, (error, response) => {
            if (error) {
                res.status(500).send(error);
            }
            res.status(200).send(response);
        });
    }
}