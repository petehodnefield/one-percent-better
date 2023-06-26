import express from "express";
const router = express.Router();

// Import model
import User from "../models/User.js";

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
  const allUsers = await User.find();
  return res.status(200).json(allUsers);
});

// Update a User
router.put("/:id", async (req, res) => {
  const user = await User.findOneAndUpdate(
    { _id: req.params.id },
    { name: req.body.name },
    { new: true }
  );
  return res.status(200).json(user);
});

export default router;
