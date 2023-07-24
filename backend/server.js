const express = require("express");
const bodyParser = require("body-parser");
const pkg = require("body-parser");
const { urlencoded } = pkg;
const mongoose = require("mongoose");
const userRoute = require("./routes/user-routes.js");
const improvementRoute = require("./routes/improvement-routes.js");
const cors = require("cors");
const dotenv = require("dotenv");
const User = require("./models/User.js");
dotenv.config();
const { fileURLToPath } = require("url");
const path = require("path");
const seedDB = require("./seed.js");
const jwt = require("jsonwebtoken");
const { signToken } = require("./utils/auth.js");

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
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

app.use(
  cors({
    origin: "*",
  })
);
// Routes
app.use("/user", userRoute);
app.use("/improvement", improvementRoute);

app.post("/login", async (req, res) => {
  const username = req.body.name;
  const password = req.body.password;
  const user = { username, password };
  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
});
// function authenticateToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (token === null) return res.sendStatus(401);

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }

app.use((req, res) => {
  res.status(404).send("Sorry can't find that").end();
});

app.listen(port, async () => {
  // seedDB();
  console.log(`🚀 Example app listening on port ${port}`);
});
