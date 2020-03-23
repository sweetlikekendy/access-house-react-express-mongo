require("dotenv").config();
const mongoose = require("mongoose");

// Connect to the db
module.exports = connect = url => {
  url = process.env.dbUrl;
  if (process.env.NODE_ENV === "production") {
    return mongoose
      .connect(
        // `mongodb://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@ds135207.mlab.com:35207/heroku_tqmfppfx`,
        `mongodb://admin:hello1991@ds135207.mlab.com:35207/heroku_tqmfppfx`,
        {
          useUnifiedTopology: true,
          useNewUrlParser: true,
          useFindAndModify: false
        }
      )
      .then(() => console.log("MongoDB connected ... "))
      .catch(err => console.log(err));
  } else {
    return mongoose
      .connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
      })
      .then(() => console.log("MongoDB connected ... "))
      .catch(err => console.log(err));
  }
};
