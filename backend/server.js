import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/user-routes.js";

import dotenv from "dotenv";
dotenv.config();

// DB Connection
mongoose.connect(process.env.MONGODB_URI).catch((error) => console.log(error));
mongoose.connection.on("error", (err) => {
  console.log(err);
});

const app = express();
const port = 3001;

// Routes
app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`🚀 Example app listening on port ${port}`);
});
