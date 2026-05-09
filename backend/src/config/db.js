const mongoose = require('mongoose');

// Fail fast instead of buffering when DB is unavailable.
mongoose.set('bufferCommands', false);

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
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error', err.message);
    console.warn('Continuing without DB connection (development).');
    return;
  }
};

const isReady = () => mongoose.connection.readyState === 1;

module.exports = { connect, isReady };
