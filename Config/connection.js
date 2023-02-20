const mongoose = require('mongoose');
const url = process.env.MONGODB_URL

mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('database is connected');
  } catch (error) {
    console.error('database not connect:', error);
  }
};

module.exports = connectDB;