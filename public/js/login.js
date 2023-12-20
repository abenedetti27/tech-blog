const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

router.get('/login', (req, res) => {
  res.sendFile('login.html', { root: 'views' });
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });


    if (user && await bcrypt.compare(password, user.password)) {

      req.session.user = user;
      res.redirect('/dashboard');
    } else {
      res.status(401).send('Invalid username or password');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
