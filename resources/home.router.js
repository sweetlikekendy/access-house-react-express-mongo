const express = require("express");
// const controllers = require("./home.controller");
const controllers = require("../utils/crud");
const Home = require("./home.model");
const router = express.Router();

// // Get all homes in /homes route
// router.get("/", controllers.getAll);

// // Create a home
// router.post("/", controllers.createOne);

// // Get a single home by id
// router.get("/:id", controllers.getOne);

// // Update a single home by id
// router.put("/:id", controllers.updateOne);

// // Delete a single home by id
// router.delete("/:id", controllers.removeOne);

router.get("/", controllers.getAll(Home));

router.post("/", controllers.createOne(Home));

router.get("/:id", controllers.getOne(Home));

router.put("/:id", controllers.updateOne(Home));

router.delete("/:id", controllers.removeOne(Home));
// Create mongoose document
// connect()
//   .then(async connection => {
//     const home = await Home.create({
//       address: "1234 Home Ave.",
//       city: "San Diego",
//       zip: "92101",
//       code: "0000"
//     });
//     console.log(home);
//   })
//   .catch(err => console.error(err));

module.exports = router;
