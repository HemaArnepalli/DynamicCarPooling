import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  dateTime: { type: Date, required: true },
  totalSeats: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  fare: { type: Number, default: 0 },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["UPCOMING", "ONGOING", "COMPLETED", "CANCELLED","completed"], default: "UPCOMING" },
   reviews: [
    {
      reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number, min: 1, max: 5 },
      comment: String,
    },
  ],
  requiresApproval: { type: Boolean, default: false },

}, { timestamps: true });

export default mongoose.model("Ride", rideSchema);
