const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
require('express-async-errors');

const formsRouter = require('./routes/forms');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

const allowedOrigins = [
	'https://ghar-saathi.vercel.app',
	'http://localhost:5173',
	'http://localhost:5174',
	'http://localhost:3000',
	'http://127.0.0.1:5173',
	'http://127.0.0.1:5174',
	'http://127.0.0.1:3000',
];

const corsOptions = {
	origin: function (origin, callback) {
		if (!origin) return callback(null, true);
		// Normalize trailing slash to avoid exact-match issues
		const normalize = (u) => (typeof u === 'string' && u.endsWith('/') ? u.slice(0, -1) : u);
		const normalizedOrigin = normalize(origin);
		const normalizedAllowed = allowedOrigins.map(normalize);
		if (normalizedAllowed.indexOf(normalizedOrigin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.json({ status: 'ok' }));

app.use('/api/forms', formsRouter);

app.use(errorHandler);

module.exports = app;
