require("dotenv").config();
const express = require("express");
const connect = require("./connect");
const homeRoute = require("./resources/home.router");
const app = express();
const PORT = process.env.PORT || 5555;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/homes", homeRoute);

module.exports = start = async () => {
  try {
    await connect();
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
};
