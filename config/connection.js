
const mongoose = require('mongoose');

// add URL of  MongoDB database
const mongoURI = 'mongodb+srv://abenedetti27:<Expelliarmus103*>@cluster0.pzwakbl.mongodb.net/';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); 
  }
};

module.exports = connectDB;
