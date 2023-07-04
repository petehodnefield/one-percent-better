const express = require("express");
const router = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");

// Import model
const User = require("../models/User.js");
const Improvement = require("../models/Improvement.js");

// Create User
router.post("/", async (req, res) => {
  const newPerson = new User({
    name: req.body.name,
  });
  const insertedUser = await newPerson.save();

  return res.status(201).json(insertedUser);
});

// Get all Users
router.get("/", async (req, res) => {
  const allUsers = await User.find().populate("improvements");

  return res.status(200).json(allUsers);
});

// Get a User
router.get("/:id", async (req, res) => {
  console.log(req.query);
  const user = await User.findOne({ _id: req.query.id });
  if (!res) {
    return res.status(404).json({ message: "User not found!" });
  }
  return res.status(200).json(user);
});

// Update a User
router.put("/:id", async (req, res) => {
  // res.json({ message: "Hello" });
  // res.send(req.query.id);
  const user = await User.findOneAndUpdate(
    { _id: req.query.id },
    { name: req.body.name, improvements: req.body.improvements },
    { new: true }
  );
  if (!res) {
    return res.status(404).json({ message: "User not found!" });
  }
  return res.status(200).json(user);
});

// Delete an improvement
// Find the user by ID
// Delete a specific improvement? How?
router.put("/improvements/:id", async (req, res) => {
  const user = await User.findOneAndUpdate(
    { _id: req.query.id },
    {
      $pull: {
        improvements: { date: "June 28, 2023" },
      },
    }
  );
  if (!res) {
    return res.status(404).json({ message: "User not found!" });
  }
  return res.status(200).json(user);
});
// Create an improvement
router.post("/:userId", async (req, res) => {
  const newImprovement = new Improvement({
    date: req.body.date,
    skillPercentage: req.body.skillPercentage,
    description: req.body.description,
  });
  const insertedImprovement = await newImprovement.save();
  const user = await User.findOneAndUpdate(
    { _id: req.query.userId },
    { $push: { improvements: insertedImprovement._id } },
    { new: true }
  );
  return user;
});

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (token === null) return res.sendStatus(401);

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }

module.exports = router;
