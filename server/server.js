require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connect = require("./connect");
const homeRoute = require("./resources/home.router");
const app = express();
const PORT = process.env.PORT || 5555;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use Routes
app.use("/api/homes", homeRoute);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(__dirname, "client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

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
