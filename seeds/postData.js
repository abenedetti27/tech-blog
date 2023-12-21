const BlogPost = require('../models/post');

const postData = [
  {
    userId: 'your_user_id_1',
    title: 'Introduction to CMS-style Blogging',
    contents: 'This is a sample blog post about CMS-style blogging.',
  },
  {
    userId: 'your_user_id_2',
    title: 'The Art of Writing Code',
    contents: 'In this post, we explore the art of writing elegant and efficient code.',
  },

];

const seedPostData = async () => {
  try {
    await BlogPost.deleteMany();
    await BlogPost.insertMany(postData);
    console.log('Blog post data seeded successfully');
  } catch (error) {
    console.error('Error seeding blog post data:', error);
  }
};

module.exports = seedPostData;
