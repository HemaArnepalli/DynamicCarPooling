// routes/adminRoutes.js
import express from "express";
import {
  login,
  getSummary,
  getUsers,
  getBookings,
  getRides,
  deleteRide,
} from "../controllers/adminController.js";

const router = express.Router();

// ✅ Admin login
router.post("/login", login);

// ✅ Dashboard summary
router.get("/reports/summary", getSummary);

// ✅ Rides
router.get("/rides", getRides);
router.delete("/rides/:id", deleteRide);

// ✅ Bookings
router.get("/bookings", getBookings);

// ✅ Users (optional for later)
// router.get("/users", getUsers);

export default router;
