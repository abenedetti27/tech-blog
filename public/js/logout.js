const express = require('express');

const router = express.Router();

router.get('/logout', (req, res) => {

  req.session.destroy(err => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;
