const User = require('../models/user');

const userData = [
  {
    username: 'user1',
    password: 'password1', 
  },
  {
    username: 'user2',
    password: 'password2',
  },
 
];

const seedUserData = async () => {
  try {
    await User.deleteMany();
    await User.insertMany(userData);
    console.log('User data seeded successfully');
  } catch (error) {
    console.error('Error seeding user data:', error);
  }
};

module.exports = seedUserData;
