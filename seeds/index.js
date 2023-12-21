const mongoose = require('mongoose');
const seedCommentData = require('./commentData');
const seedPostData = require('./postData');
const seedUserData = require('./userData');

// Replace db url with the actual URL of MongoDB database
mongoose.connect('', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');
  await seedCommentData();
  await seedPostData();
  await seedUserData();
  mongoose.connection.close();
});
