import mongoose from "mongoose";
require('dotenv').config();

mongoose.connect(
   `mongodb://localhost:27017/${process.env.DB}`,
    {
      useNewUrlParser: true,
      useFindAndModify: false
    }
  );

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connected to MongoDB database")
});

module.exports = db;
