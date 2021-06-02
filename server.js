const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/db');
const user = require('./routes/user');
const twits = require('./routes/twits');
const profile = require('./routes/profile');
const auth = require('./routes/auth');

const app = express();
dotenv.config({ path: './config/config.env' });

// Replaces body parser
app.use(express.json());

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

// Routes
app.use('/api/v1', user);
app.use('/api/v1/auth', auth);
app.use('/api/v1/twits', twits);
app.use('/api/v1/:username', profile);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`.rainbow.bgBlack);
});
