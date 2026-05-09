const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
require('express-async-errors');

const formsRouter = require('./routes/forms');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

const corsOptions = process.env.FRONTEND_URL ? { origin: process.env.FRONTEND_URL } : { origin: true };

app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.json({ status: 'ok' }));

app.use('/api/forms', formsRouter);

app.use(errorHandler);

module.exports = app;
