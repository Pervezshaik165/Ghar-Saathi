const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const { getTransporter } = require('../config/mailer');

async function testEmail() {
  const transporter = getTransporter();
  const admin = process.env.ADMIN_EMAIL || 'arshisweety009@gmail.com';
  if (!transporter) {
    console.log('SMTP not configured. Please set SMTP_HOST, SMTP_USER, SMTP_PASS in .env');
    return process.exit(1);
  }

  try {
    // verify connection
    await transporter.verify();
    console.log('SMTP connection OK');

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: admin,
      subject: 'Test Email from Ghar Saathi Backend',
      text: 'This is a test email to verify SMTP configuration.',
    });

    console.log('Test email sent:', info && (info.messageId || info.response || JSON.stringify(info)));
    process.exit(0);
  } catch (err) {
    console.error('Failed to send test email:', err && err.message ? err.message : err);
    process.exit(2);
  }
}

testEmail();
