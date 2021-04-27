const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/db');
const user = require('./routes/user');
const twits = require('./routes/twits');
const profile = require('./routes/profile');

const app = express();
dotenv.config({ path: './config/config.env' });

// Replaces body parser
app.use(express.json());

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

// Routes
app.use('/api/v1/', user);
app.use('/api/v1/:username/', profile);
app.use('/api/v1/:username/twits/', twits);

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`.rainbow.bgBlack);
});
