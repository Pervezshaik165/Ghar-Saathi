const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const { sendMail } = require('../config/mailer');

async function testEmail() {
  const admin = process.env.ADMIN_EMAIL || 'arshisweety009@gmail.com';

  try {
    const info = await sendMail({
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: admin,
      subject: 'Test Email from Ghar Saathi Backend',
      text: 'This is a test email to verify email configuration.',
    });

    if (!info) {
      console.log('Email provider not configured. Set RESEND_API_KEY or SMTP_* values in .env');
      return process.exit(1);
    }

    console.log('Test email sent:', info && (info.messageId || info.id || info.response || JSON.stringify(info)));
    process.exit(0);
  } catch (err) {
    console.error('Failed to send test email:', err && err.message ? err.message : err);
    process.exit(2);
  }
}

testEmail();
