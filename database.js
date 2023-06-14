const mongoose = require('mongoose');
require('dotenv').config();

const connectDatabase = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: process.env.MONGO_DBNAME,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed', error);
    process.exit(1); // Exit the process with a failure code
  }
};

module.exports = connectDatabase;
