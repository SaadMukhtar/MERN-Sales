import express from "express";
const router = express.Router();
import { addOrderItems } from "../controllers/orderController.js";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(addOrderItems);
export default router;
