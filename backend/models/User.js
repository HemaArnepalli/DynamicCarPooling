// backend/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    contact: { type: String, required: true },
    role: {
      type: String,
      enum: ["PASSENGER", "DRIVER", "ADMIN"],
      default: "PASSENGER",
    },
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", default: null },
    blocked: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
