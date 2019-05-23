const express = require("express");
const controllers = require("./home.controller");
const router = express.Router();

// Get all homes in /homes route
router.get("/", controllers.getAll);

// Create a home
router.post("/", controllers.createOne);

// Get a single home by id
router.get("/:id", controllers.getOne);

// Update a single home by id
router.put("/:id", controllers.updateOne);

// Delete a single home by id
router.delete("/:id", controllers.removeOne);

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
