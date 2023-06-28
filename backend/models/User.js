const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  improvements: [
    {
      type: Schema.Types.ObjectId,
      ref: "Improvement",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
