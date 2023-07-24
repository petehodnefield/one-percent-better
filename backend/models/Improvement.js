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

const Improvement = mongoose.model("Improvement", improvementSchema);

export default Improvement;
