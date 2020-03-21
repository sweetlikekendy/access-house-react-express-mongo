require("dotenv").config();
const mongoose = require("mongoose");

// Connect to the db
module.exports = connect = url => {
  url = process.env.dbUrl;
  return mongoose
    .connect(
      url ||
        `mongodb://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@ds135207.mlab.com:35207/heroku_tqmfppfx`,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
      }
    )
    .then(() => console.log("MongoDB connected ... "))
    .catch(err => console.log(err));
};
