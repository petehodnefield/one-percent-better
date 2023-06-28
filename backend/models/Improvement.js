const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

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

const Improvement = mongoose.model("Improvement", improvementSchema);

module.exports = Improvement;
