# tech-blog

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description <a name="description"></a>

This CMS-style blog site can publish articles and blog posts. 

## Table of Contents 
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Questions](#questions)

## Installation <a name="installation"></a>
When a user visits the blog site for the first time they are presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in. 
When they click on the homepage option, they are taken to the homepage.When they click on any other links in the navigation, they are prompted to either sign up or sign in. When they choose to sign up, they are prompted to create a username and password. WHen they click on the sign-up button, their user credentials are saved and they are logged into the site.
When they revisit the site at a later time and choose to sign in, they are prompted to enter their username and password. When they are signed in to the site, they see navigation links for the homepage, the dashboard, and the option to log out. When they click on the homepage option in the navigation, they are taken to the homepage and presented with existing blog posts that include the post title and the date created. When they click on an existing blog post, they are presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment.
When they enter a comment and click on the submit button while signed in, the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created.
WHen they click on the dashboard option in the navigation, they are taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post.
When they click on the button to add a new blog post,
they are prompted to enter both a title and contents for my blog post.
When they click on the button to create a new blog post,
the title and contents of they post are saved and the user is taken back to an updated dashboard with my new blog post. When they click on one of their existing posts in the dashboard, they are able to delete or update their post and taken back to an updated dashboard. WHen they click on the logout option in the navigation, they are signed out of the site. When the user is idle on the site for more than a set time, they are able to view posts and comments but will be prompted to log in again before they can add, update, or delete posts.
```

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

const authMiddleware = require('../../middleware/auth');
const User = require('../../models/user');


router.post(
  '/',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      let existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ msg: 'Username is already taken' });
      }

      const newUser = new User({
        username,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);

      await newUser.save();

      const payload = {
        user: {
          id: newUser.id,
        },
      };

      jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600 }, (error, token) => {
        if (error) throw error;
        res.json({ token });
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);


router.post(
  '/login',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600 }, (error, token) => {
        if (error) throw error;
        res.json({ token });
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);


router.get('/current', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;


```

## Usage <a name="usage"></a>
This CMS-style blog site is for users to publish articles, blog posts, and thoughts and options.

## License <a name="license"></a>
MIT License


## Questions <a name="questions"></a>

GitHub Profile: [github](https://github.com/abenedetti27)

Please direct any questions to:

Email: abenedetti27@gmail.com
