// Simple diagnostic to test MongoDB connection using the project's db connector.
// Usage: set MONGODB_URI in env then run `node scripts/check-db.js`

const connectDB = require('../db');

async function run() {
  try {
    await connectDB();
    console.log('Connected to MongoDB successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err && err.message ? err.message : err);
    process.exit(2);
  }
}

run();
