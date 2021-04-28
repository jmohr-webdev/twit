const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
  try {
    mongoose.set('useCreateIndex', true);
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Now connected to ${db.connection.host}`.brightGreen);
  } catch (error) {
    console.log('Database could not connect'.brightRed);
    process.exit(1);
  }
};

module.exports = connectDB;
