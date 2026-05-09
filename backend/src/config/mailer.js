const nodemailer = require('nodemailer');

let transporter = null;

function createTransporter() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    const timeoutMs = process.env.SMTP_TIMEOUT_MS ? parseInt(process.env.SMTP_TIMEOUT_MS, 10) : 5000;
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587,
      secure: process.env.SMTP_SECURE === 'true',
      connectionTimeout: timeoutMs,
      greetingTimeout: timeoutMs,
      socketTimeout: timeoutMs,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    return transporter;
  }
  return null;
}

function getTransporter() {
  if (transporter) return transporter;
  return createTransporter();
}

module.exports = { getTransporter };
