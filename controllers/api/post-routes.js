
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const authMiddleware = require('../../middleware/auth');

const BlogPost = require('../../models/blogPost');


router.get('/', async (req, res) => {
  try {
    const blogPosts = await BlogPost.find().sort({ createdAt: -1 });
    res.json(blogPosts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});


router.get('/:postId', async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.postId);
    if (!blogPost) {
      return res.status(404).json({ msg: 'Blog post not found' });
    }
    res.json(blogPost);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});


router.post(
  '/',
  [authMiddleware, check('title', 'Title is required').not().isEmpty(), check('contents', 'Contents are required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, contents } = req.body;
      const userId = req.user.id;

      const newBlogPost = new BlogPost({
        title,
        contents,
        userId,
      });

      await newBlogPost.save();
      res.json(newBlogPost);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);


module.exports = router;
