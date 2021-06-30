const mongoose = require("mongoose");

const connectDB = () => {
  const mongodbUrl =
    "mongodb+srv://admin:root@cluster0.cjcis.mongodb.net/social_block?retryWrites=true&w=majority";
  try {
    mongoose.connect(mongodbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.log("Mongoose error: ", err);
  }
  const db = mongoose.connection;
  return db;
};

module.exports = {
  connectDB,
};
