import nodemailer from "nodemailer";
import config from "../config.json";

export default async function sendEmail({ to, subject, html, from }: any) {
    try {
        const emailFrom = process.env.EMAIL_FROM || config.emailform;

        // Force casting values through unknown to bypass the strict string/number compiler type wall
        const smtpPort = (process.env.SMTP_PORT || config.smtpOptions?.port || "587") as unknown as number;

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || config.smtpOptions?.host || 'smtp-relay.brevo.com',
            port: smtpPort,
            secure: false,
            auth: {
                user: process.env.SMTP_USER || config.smtpOptions?.auth?.user,
                pass: process.env.SMTP_PASSWORD || config.smtpOptions?.auth?.pass
            }
        } as any);

        console.log(`Attempting to send email to: ${to}`);
        await transporter.sendMail({ from: emailFrom, to, subject, html });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}