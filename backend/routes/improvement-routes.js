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

// Get all improvements
router.get("/", async (req, res) => {
  const allImprovements = await Improvement.find();
  return res.status(201).json(allImprovements);
});

// Update an improvement's description
router.put("/:id", async (req, res) => {
  const updateImprovement = await Improvement.findOneAndUpdate(
    { _id: req.query.id },
    { description: req.body.description },
    { new: true }
  );
  return res.status(201).json(updateImprovement);
});

// Delete an improvement
router.delete("/:id", async (req, res) => {
  const deleteImprovement = await Improvement.findOneAndDelete({
    _id: req.query.id,
  });
  return res.status(201).json(deleteImprovement);
});

module.exports = router;
