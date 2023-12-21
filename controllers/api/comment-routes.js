
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const authMiddleware = require('../../middleware/auth');

const Comment = require('../../models/comment');
const BlogPost = require('../../models/Post');


router.post(
  '/:postId',
  [authMiddleware, check('commentText', 'Comment text is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { commentText } = req.body;
      const postId = req.params.postId;
      const userId = req.user.id;


      const blogPost = await BlogPost.findById(postId);
      if (!blogPost) {
        return res.status(404).json({ msg: 'Blog post not found' });
      }

   
      const newComment = new Comment({
        postId,
        text: commentText,
        userId,
      });


      await newComment.save();

      blogPost.comments.push(newComment);
      await blogPost.save();

      res.json(newComment);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);


module.exports = router;
