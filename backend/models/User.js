const mongoose = require("mongoose");

const improvementSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
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

module.exports = User;
