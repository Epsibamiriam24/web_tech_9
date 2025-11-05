const mongoose = require('mongoose');

// Connection string: prefer MONGODB_URI env var (use Atlas URI), fallback to local MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/based_resume_screening';

mongoose.set('strictQuery', false);

// Export a function that connects and returns the connect promise. Use a short serverSelectionTimeoutMS
// so failures surface quickly when Atlas is unreachable or not whitelisted.
function connectDB() {
  return mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000 // 10s
  });
}

module.exports = connectDB;
