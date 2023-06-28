import express from "express";
const router = express.Router();
import userRoute from "./user-routes";
router.use(userRoute);

module.exports = router;
