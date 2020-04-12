import { createTransport } from 'nodemailer';
import { getConfirmAccountTemplate } from '../helpers/html-templates/confirm-account';

export const sendAccountConfirmationEmail = async (user: any) => {
    const senderEmail = process.env.SENDER_EMAIL;
    const senderPassword = process.env.SENDER_PASSWORD;

    const fromMail = senderEmail;
    const toMail = user.email;
    const subject = 'Welcome to FbApp, Confirm Your Account!';
    const html = getConfirmAccountTemplate(user.userName, user.verificationToken);

    const transporter = createTransport({
        service: 'gmail',
        auth: {
            user: senderEmail,
            pass: senderPassword
        }
    });
    const mailOptions = {
        from: fromMail,
        to: toMail,
        subject: subject,
        html
    };
    return await transporter.sendMail(mailOptions);
}
