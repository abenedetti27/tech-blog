
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  const pageTitle = 'My CMS Blog';
  const isAuthenticated = req.isAuthenticated(); // You may have your own authentication logic

  res.render('homepage', { pageTitle, isAuthenticated });
});

module.exports = router;
