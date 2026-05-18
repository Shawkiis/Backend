import nodemailer from "nodemailer";
import config from "../config.json";
import dns from "dns";

export default async function sendEmail({ to, subject, html, from }: any) {
    try {
        const emailFrom = process.env.EMAIL_FROM || config.emailform;

        // Cast configuration to 'any' to bypass strict TransportOptions object limitations
        const smtpConfig: any = {
            host: process.env.SMTP_HOST || config.smtpOptions?.host || 'smtp-relay.brevo.com',
            port: parseInt(process.env.SMTP_PORT || config.smtpOptions?.port || '587', 10),
            secure: false,
            auth: {
                user: process.env.SMTP_USER || config.smtpOptions?.auth?.user,
                pass: process.env.SMTP_PASSWORD || config.smtpOptions?.auth?.pass
            },
            connectionTimeout: 10000,
            greetingTimeout: 10000,
            socketTimeout: 10000,
            // Explicitly typing the lookup parameters to make the TypeScript compiler happy
            lookup: (hostname: string, options: any, callback: (err: NodeJS.ErrnoException | null, address: string, family: number) => void) => {
                dns.resolve4(hostname, (err: NodeJS.ErrnoException | null, addresses: string[]) => {
                    if (err) return callback(err, '', 4);
                    callback(null, addresses[0], 4);
                });
            }
        };

        const transporter = nodemailer.createTransport(smtpConfig);

        console.log(`Attempting to send email to: ${to}`);
        await transporter.sendMail({ from: emailFrom, to, subject, html });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}