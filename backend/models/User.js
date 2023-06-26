import mongoose from "mongoose";

const improvementSchema = new mongoose.Schema({
  date: {
    type: String,
  },
  skillPercentage: {
    type: Number,
  },
  description: {
    type: String,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  improvements: [improvementSchema],
});

const User = mongoose.model("User", userSchema);

export default User;
