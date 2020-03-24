require("dotenv").config();
const mongoose = require("mongoose");

// Connect to the db
module.exports = connect = url => {
  if (process.env.NODE_ENV === "production") {
    return mongoose
      .connect(
        process.env.DB_URL,
        // `mongodb://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@ds135207.mlab.com:35207/heroku_tqmfppfx`,
        // `mongodb://admin:hello1991@ds135207.mlab.com:35207/heroku_tqmfppfx`,
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
      .connect(process.env.DB_URL_DEV, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
      })
      .then(() => console.log("MongoDB connected ... "))
      .catch(err => console.log(err));
  }
};
