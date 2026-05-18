import nodemailer from "nodemailer";
import config from "../config.json";

export default async function sendEmail({ to, subject, html, from }: any) {
    try {
        const emailFrom = process.env.EMAIL_FROM || config.emailform;

        // Bypass DNS entirely by using Brevo's direct IPv4 address 
        // This stops Render's IPv6 ENETUNREACH error without triggering TypeScript type errors.
        const transporter = nodemailer.createTransport({
            host: '185.107.232.248', 
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER || config.smtpOptions?.auth?.user,
                pass: process.env.SMTP_PASSWORD || config.smtpOptions?.auth?.pass
            },
            connectionTimeout: 10000,
            greetingTimeout: 10000,
            socketTimeout: 10000,
            tls: {
                // Tells nodemailer to verify the certificate for Brevo since we connect via direct IP
                servername: 'smtp-relay.brevo.com'
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