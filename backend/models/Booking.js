import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  ride: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ride",
    required: true,
  },
  passenger: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  seatsBooked: {
    type: Number,
    required: true,
    min: 1,
  },
  fare: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["CONFIRMED"],
    default: "CONFIRMED", // always confirmed for dummy flow
  },
  paymentStatus: { type: String, enum: ["PAID"], default: "PAID" }, // always paid
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Booking", bookingSchema);
