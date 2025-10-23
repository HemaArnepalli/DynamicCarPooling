

// backend/routes/userRoutes.js
import express from "express";
import { registerUser, loginUser,getUserProfile } from "../controllers/userController.js";

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

router.get("/profile/:userId", getUserProfile);

export default router;
