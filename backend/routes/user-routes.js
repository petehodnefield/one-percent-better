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
router.put(":id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);
    if (!user) {
      return res
        .status(404)
        .json({ message: `Cannot find nay product with ID ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
