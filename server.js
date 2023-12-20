const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcrypt');
const app = express();


mongoose.connect('your_database_url', { useNewUrlParser: true, useUnifiedTopology: true });


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: 'your_secret_key', resave: true, saveUninitialized: true }));




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
