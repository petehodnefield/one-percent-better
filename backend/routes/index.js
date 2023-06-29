import express from "express";
const router = express.Router();
import userRoute from "./user-routes";
router.use(userRoute);
import improvementRoute from "./improvement-routes";
router.use(improvementRoute);

module.exports = router;
