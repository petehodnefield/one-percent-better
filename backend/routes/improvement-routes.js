const express = require("express");
const router = express.Router();

// Import model
const User = require("../models/User.js");
const Improvement = require("../models/Improvement.js");

// Create an improvement
router.post("/:id", async (req, res) => {
  const newImprovement = new Improvement({
    date: req.body.date,
    skillPercentage: req.body.skillPercentage,
    description: req.body.description,
  });
  const insertedImprovement = await newImprovement.save();

  const updatedUser = await User.findOneAndUpdate(
    { _id: req.query.id },
    { $push: { improvements: insertedImprovement._id } },
    { new: true }
  );
  return res.status(201).json(updatedUser);
});

module.exports = router;
