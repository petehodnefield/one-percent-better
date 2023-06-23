import express from "express";
import mongoose from "mongoose";
import User from "./models/User.js";
import dotenv from "dotenv";
dotenv.config();
mongoose.connect(process.env.MONGODB_URI).catch((error) => console.log(error));
mongoose.connection.on("error", (err) => {
  console.log(err);
});
const app = express();
const port = 3001;

const newPerson = new User({
  name: "Peter",
  improvements: {
    date: "June 23, 2023",
    skillPercentage: 1,
    description: "Today I worked on TypeScript",
  },
});
console.log(newPerson);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`🚀 Example app listening on port ${port}`);
});
