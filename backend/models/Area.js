import mongoose from "mongoose";
import { Schema } from "mongoose";

const areaSchema = new mongoose.Schema({
  area: {
    type: String,
    min: 1,
    max: 50,
  },
  improvements: [
    {
      type: Schema.Types.ObjectId,
      ref: "Improvement",
    },
  ],
});

const Area = mongoose.model("Area", areaSchema);

export default Area;
