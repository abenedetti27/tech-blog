const express = require('express');
const BlogPost = require('../models/blogPost');

const router = express.Router();

router.get('/editpost/:postId', (req, res) => {
  const postId = req.params.postId;

  BlogPost.findById(postId)
    .then(blogPost => {
      res.render('editpost.html', { blogPost });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
});

router.post('/editpost/:postId', (req, res) => {
  const postId = req.params.postId;
  const { title, contents } = req.body;

  BlogPost.findByIdAndUpdate(postId, { title, contents }, { new: true })
    .then(updatedPost => {
      res.redirect(`/post/${updatedPost._id}`);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;
