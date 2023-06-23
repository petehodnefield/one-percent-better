import mongoose from "mongoose";

const improvementSchema = new mongoose.Schema({
  date: String,
  skillPercentage: Number,
  description: String,
});

const userSchema = new mongoose.Schema({
  name: String,
  improvements: improvementSchema,
});

const User = mongoose.model("User", userSchema);

export default User;
