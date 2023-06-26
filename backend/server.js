import express from "express";
import bodyParser from "body-parser";
import pkg from "body-parser";
const { urlencoded } = pkg;
import mongoose from "mongoose";
import userRoute from "./routes/user-routes.js";

import dotenv from "dotenv";
import User from "./models/User.js";
dotenv.config();
import { fileURLToPath } from "url";
import path from "path";
import seedDB from "./seed.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// DB Connection
mongoose.connect(process.env.MONGODB_URI).catch((error) => console.log(error));
mongoose.connection.on("error", (err) => {
  console.log(err);
});

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Routes
app.use("/user", userRoute);

app.listen(port, async () => {
  seedDB();
  console.log(`🚀 Example app listening on port ${port}`);
});
