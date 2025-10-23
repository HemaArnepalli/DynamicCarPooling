import express from "express";
import { createBooking, getBookingsByRide,getBookingsByPassenger } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/ride/:rideId", getBookingsByRide);
router.get("/passenger/:passengerId", getBookingsByPassenger);

export default router;
