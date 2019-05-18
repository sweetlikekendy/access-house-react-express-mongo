require("dotenv").config();
const mongoose = require("mongoose");

// Connect to the db
module.exports = connect = url => {
  url = process.env.dbUrl;
  return mongoose.connect(url, { useNewUrlParser: true });
};
