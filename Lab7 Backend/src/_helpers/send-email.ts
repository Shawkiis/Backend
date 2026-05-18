import nodemailer from "nodemailer";
import config from "../config.json";

export default async function sendEmail({to, subject, html, from}: any){
    try {
        // Fallback to config if Environment variables aren't set yet
        const emailFrom = process.env.EMAIL_FROM || config.emailform;

        // Force IPv4 and use your Render Environment variables directly
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || config.smtpOptions?.host || 'smtp-relay.brevo.com',
            port: parseInt(process.env.SMTP_PORT || config.smtpOptions?.port || '587'),
            secure: false, 
            auth: {
                user: process.env.SMTP_USER || config.smtpOptions?.auth?.user,
                pass: process.env.SMTP_PASSWORD || config.smtpOptions?.auth?.pass
            },
            // CRITICAL FIX: Forces Node to use IPv4 to bypass the Render network error
            connectionTimeout: 10000,
            greetingTimeout: 10000,
            socketTimeout: 10000,
            dns({ hostname, options }, callback) {
                require('dns').resolve4(hostname, (err, addresses) => {
                    if (err) return callback(err);
                    callback(null, addresses[0], 4);
                });
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