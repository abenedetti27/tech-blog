const express = require('express');
const BlogPost = require('../models/blogPost');

const router = express.Router();

router.get('/post/:postId', (req, res) => {
  const postId = req.params.postId;


  BlogPost.findById(postId)
    .then(blogPost => {
      res.render('post.html', { blogPost });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
});



module.exports = router;
