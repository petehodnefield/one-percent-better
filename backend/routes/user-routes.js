import express from "express";
const router = express.Router();
// Import model
import User from "../models/User.js";

router.post("/", async (req, res) => {
  console.log(`Request body ${req.body}`);
  const newPerson = new User({
    name: req.body.name,
  });
  const insertedUser = await newPerson.save();

  return res.status(201).json(insertedUser);
});

router.get("/", async (req, res) => {
  const allUsers = await User.find();
  return res.status(200).json(allUsers);
});

export default router;
