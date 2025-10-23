import express from "express";
import {
  createRide,
  getDriverRides,
  updateRide,
  deleteRide,
  calculateFare,
  updateRideStatus,
  searchRides,
  getRideById
} from "../controllers/rideController.js";

const router = express.Router();

// Driver creates ride
router.post("/", createRide);

// Get rides by driver
router.get("/driver/:driverId", getDriverRides);

router.get("/search", searchRides);

// Update ride
router.put("/:rideId", updateRide);

// Delete ride
router.delete("/:rideId", deleteRide);

// Fare calculation
router.get("/calculate-fare", calculateFare);
router.patch("/:rideId/status", updateRideStatus);
// Get ride by ID
router.get("/:rideId", getRideById);

// Fare calculation
router.get("/calculate-fare", calculateFare);

export default router;
