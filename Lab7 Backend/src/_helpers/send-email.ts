import nodemailer from "nodemailer";
import config from "../config.json";

export default async function sendEmail({ to, subject, html, from }: any) {
    try {
        const emailFrom = process.env.EMAIL_FROM || config.emailform;

        // Clean values to prevent TypeScript compilation errors
        const smtpHost = process.env.SMTP_HOST || config.smtpOptions?.host || 'smtp-relay.brevo.com';
        const smtpPort = (process.env.SMTP_PORT || config.smtpOptions?.port || "587") as unknown as number;
        const smtpUser = process.env.SMTP_USER || config.smtpOptions?.auth?.user;
        const smtpPass = process.env.SMTP_PASSWORD || config.smtpOptions?.auth?.pass;

        // DIAGNOSTIC LOGS: Check these in your Render Logs dashboard frame!
        console.log("=== NODEMAILER CONFIGURATION LOG ===");
        console.log(`Target Recipient: ${to}`);
        console.log(`Sender Address: ${emailFrom}`);
        console.log(`SMTP Host: ${smtpHost}`);
        console.log(`SMTP Port: ${smtpPort}`);
        console.log(`SMTP User Configured: ${smtpUser ? "YES (Value exists)" : "NO (MISSING)"}`);
        console.log(`SMTP Pass Configured: ${smtpPass ? "YES (Value exists)" : "NO (MISSING)"}`);
        console.log("====================================");

        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: false,
            auth: {
                user: smtpUser,
                pass: smtpPass
            }
        } as any);

        console.log("Sending network payload to SMTP relay...");
        await transporter.sendMail({ from: emailFrom, to, subject, html });
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('CRITICAL LOG - Email helper caught an execution failure:', error);
        throw error;
    }
}