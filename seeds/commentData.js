const Comment = require('../models/comment');

const commentData = [
  {
    postId: 'your_post_id_1',
    text: 'This is a great post!',
    username: 'user1',
  },
  {
    postId: 'your_post_id_2',
    text: 'I enjoyed reading this!',
    username: 'user2',
  },
  
];

const seedCommentData = async () => {
  try {
    await Comment.deleteMany();
    await Comment.insertMany(commentData);
    console.log('Comment data seeded successfully');
  } catch (error) {
    console.error('Error seeding comment data:', error);
  }
};

module.exports = seedCommentData;
