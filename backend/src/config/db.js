const mongoose = require('mongoose');

const connect = async () => {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!uri) {
    console.warn('MONGO_URI / MONGODB_URI not set in environment; skipping MongoDB connection (development only).');
    return;
  }
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error', err.message);
    console.warn('Continuing without DB connection (development).');
    return;
  }
};

module.exports = { connect };
