const express = require("express");
const controllers = require("./home.controller");
const router = express.Router();

// Get all homes in /homes route
router.get("/", controllers.getAll);

// Create a home
router.post("/", controllers.createOne);

// Get a single home by id
router.get("/:id", controllers.getOne);

// Edit a single home by id
router.patch("/:id/edit", controllers.updateOne);

// Delete a single home by id
router.delete("/:id/", controllers.removeOne);

module.exports = router;
