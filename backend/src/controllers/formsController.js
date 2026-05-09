const { validationResult } = require('express-validator');
const HireRequest = require('../models/HireRequest');
const BecomeHelper = require('../models/BecomeHelper');
const QuickInquiry = require('../models/QuickInquiry');
const { sendMail } = require('../config/mailer');
const db = require('../config/db');
const { hireTemplate, becomeHelperTemplate, quickInquiryTemplate } = require('../services/emailTemplates');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'arshisweety009@gmail.com';
const FROM_EMAIL = process.env.EMAIL_FROM || process.env.SMTP_USER || 'no-reply@ghar-saathi.local';

async function sendEmail(subject, html) {
  try {
    const info = await sendMail({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject,
      html,
    });
    if (!info) {
      console.log('No email provider configured; email not sent. Subject:', subject);
      console.log(html);
      return;
    }
    console.log('Email sent:', info && (info.messageId || info.id || info.response || JSON.stringify(info))); 
  } catch (err) {
    console.error('Failed to send email:', err && err.message ? err.message : err);
  }
}

exports.createHireRequest = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, phone, service, address, notes } = req.body;

  let doc;
  if (db.isReady()) {
    try {
      doc = await HireRequest.create({ name, email, phone, service, address, notes });
    } catch (err) {
      console.warn('Could not save hire request to DB, continuing without DB:', err && err.message);
      doc = { _id: `tmp-${Date.now()}`, name, email, phone, service, address, notes, createdAt: new Date() };
    }
  } else {
    console.warn('DB not connected; skipping hire request save.');
    doc = { _id: `tmp-${Date.now()}`, name, email, phone, service, address, notes, createdAt: new Date() };
  }

  const html = hireTemplate(doc);
  void sendEmail('New Hire Request - Ghar Saathi', html);

  return res.status(201).json({ success: true, message: 'Hire request submitted', data: doc });
};

exports.createBecomeHelper = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, phone, skills, experience, portfolio, address, expectedFeeRange } = req.body;

  let doc;
  if (db.isReady()) {
    try {
      doc = await BecomeHelper.create({ name, email, phone, skills, expectedFeeRange, experience, portfolio, address });
    } catch (err) {
      console.warn('Could not save become-helper application to DB, continuing without DB:', err && err.message);
      doc = { _id: `tmp-${Date.now()}`, name, email, phone, skills, expectedFeeRange, experience, portfolio, address, createdAt: new Date() };
    }
  } else {
    console.warn('DB not connected; skipping become-helper save.');
    doc = { _id: `tmp-${Date.now()}`, name, email, phone, skills, expectedFeeRange, experience, portfolio, address, createdAt: new Date() };
  }

  const html = becomeHelperTemplate(doc);
  void sendEmail('New Become Helper Application - Ghar Saathi', html);

  return res.status(201).json({ success: true, message: 'Application submitted', data: doc });
};

exports.createQuickInquiry = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, phone, message } = req.body;

  let doc;
  if (db.isReady()) {
    try {
      doc = await QuickInquiry.create({ name, email, phone, message });
    } catch (err) {
      console.warn('Could not save quick inquiry to DB, continuing without DB:', err && err.message);
      doc = { _id: `tmp-${Date.now()}`, name, email, phone, message, createdAt: new Date() };
    }
  } else {
    console.warn('DB not connected; skipping quick inquiry save.');
    doc = { _id: `tmp-${Date.now()}`, name, email, phone, message, createdAt: new Date() };
  }

  const html = quickInquiryTemplate(doc);
  void sendEmail('New Quick Inquiry - Ghar Saathi', html);

  return res.status(201).json({ success: true, message: 'Inquiry submitted', data: doc });
};
