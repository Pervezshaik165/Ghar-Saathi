const nodemailer = require('nodemailer');
const https = require('https');

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

function sendWithResend({ from, to, subject, html, text }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return Promise.resolve(null);

  const payload = {
    from,
    to: Array.isArray(to) ? to : [to],
    subject,
  };
  if (html) payload.html = html;
  if (text) payload.text = text;

  const data = JSON.stringify(payload);
  const timeoutMs = process.env.SMTP_TIMEOUT_MS ? parseInt(process.env.SMTP_TIMEOUT_MS, 10) : 5000;

  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: 'api.resend.com',
        path: '/emails',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data),
        },
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => {
          body += chunk;
        });
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            try {
              resolve(JSON.parse(body));
            } catch (err) {
              resolve({ response: body });
            }
          } else {
            const error = new Error(`Resend API error: ${res.statusCode}`);
            error.response = body;
            reject(error);
          }
        });
      }
    );

    req.setTimeout(timeoutMs, () => {
      req.destroy(new Error('Resend API timeout'));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function sendMail({ from, to, subject, html, text }) {
  if (process.env.RESEND_API_KEY) {
    return sendWithResend({ from, to, subject, html, text });
  }

  const mailer = getTransporter();
  if (!mailer) return null;

  return mailer.sendMail({ from, to, subject, html, text });
}

module.exports = { getTransporter, sendMail };
