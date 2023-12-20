const express = require('express');
const BlogPost = require('../models/blogPost');
const Comment = require('../models/comment');

const router = express.Router();

router.post('/comment/:postId', (req, res) => {
  const postId = req.params.postId;
  const { commentText } = req.body;


  const newComment = new Comment({
    postId,
    text: commentText,
    username: req.session.user.username, 
  });

  newComment.save()
    .then(() => {
     
      return BlogPost.findByIdAndUpdate(postId, { $push: { comments: newComment._id } }, { new: true });
    })
    .then(updatedPost => {
      res.redirect(`/post/${updatedPost._id}`);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;
