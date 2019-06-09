require("dotenv").config();
const mongoose = require("mongoose");

// Connect to the db
module.exports = connect = url => {
  url = process.env.dbUrl;
  return mongoose
    .connect(
      url ||
        "mongodb://admin:hello1991@ds135207.mlab.com:35207/heroku_tqmfppfx",
      { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB connected ... "))
    .catch(err => console.log(err));
};
