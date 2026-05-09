Ghar Saathi - Backend

Minimal Express backend for handling frontend forms (Hire, Become Helper, Quick Inquiry).


Setup

1. Copy `.env.example` to `.env` and fill in `MONGO_URI` (or `MONGODB_URI`) and SMTP credentials.
2. Install dependencies:

```bash
cd backend
npm install
```

3. Run in development:

```bash
npm run dev
```

Environment variables

- `MONGO_URI` or `MONGODB_URI` — MongoDB connection string. If missing, backend will start but DB writes will be skipped (development only).
- `PORT` — server port (default `5000`).
- `ADMIN_EMAIL` — recipient of form submission emails (defaults to `arshisweety009@gmail.com`).
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_SECURE` — SMTP settings to enable real email delivery.
- `EMAIL_FROM` — sender address shown in emails.

Test SMTP configuration

To verify SMTP settings and send a test email to `ADMIN_EMAIL` run:

```bash
cd backend
npm run test-email
```

If SMTP is not configured the script will print a helpful message. For development you can use Mailtrap or Ethereal to capture mails without delivering to real inboxes.

API Endpoints

- POST `/api/forms/hire` - hire form
- POST `/api/forms/become-helper` - become helper form
- POST `/api/forms/quick-inquiry` - quick inquiry

Each endpoint stores the submission in MongoDB (if configured) and attempts to email a templated notification to `ADMIN_EMAIL`.
