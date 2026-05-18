import nodemailer from "nodemailer";
import config from "../config.json";

export default async function sendEmail({ to, subject, html, from }: any) {
    try {
        const emailFrom = process.env.EMAIL_FROM || config.emailform;

        // Using standard domain name strings to let standard TLS certificates match perfectly
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || config.smtpOptions?.host || 'smtp-relay.brevo.com',
            port: parseInt(process.env.SMTP_PORT || config.smtpOptions?.port || '587', 10),
            secure: false,
            auth: {
                user: process.env.SMTP_USER || config.smtpOptions?.auth?.user,
                pass: process.env.SMTP_PASSWORD || config.smtpOptions?.auth?.pass
            }
        });

        console.log(`Attempting to send email to: ${to}`);
        await transporter.sendMail({ from: emailFrom, to, subject, html });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}