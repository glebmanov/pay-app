const express = require('express');
const mongoose = require('mongoose');

const PORT = 5431;
const app = express();

app.use(express.json({ extended: true }));
app.use('/api', require('./routes/pay.route'));

const start = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://dbuser:1q2w3e4r@cluster0.afmoj.mongodb.net/addDatabase?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
  } catch (error) {
    console.log('Server error:', error.message);
    process.exit(1);
  }
};

start();