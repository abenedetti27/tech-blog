const bcrypt = require('bcrypt');

const helpers = {
 
  hashPassword: async (password) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      throw new Error(`Error hashing password: ${error.message}`);
    }
  },
};

module.exports = helpers;
