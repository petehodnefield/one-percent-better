import express from "express";
const router = express.Router();
// Import model
import User from "../models/User.js";

router.post("/", async (req, res) => {
  const newPerson = new User({
    name: "Peter",
    improvements: {
      date: "June 23, 2023",
      skillPercentage: 1,
      description: "Today I worked on TypeScript",
    },
  });
  const insertedUser = await newPerson.save();

  return res.status(201).json(insertedUser);
});

router.get("/", async (req, res) => {
  const allUsers = await User.find();
  return res.status(200).json(allUsers);
});

export default router;
