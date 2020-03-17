const mongoose = require("mongoose");

// Create a Schema for the model
const homeSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  }
});

// Create mongoose model
module.exports = mongoose.model("home", homeSchema);
