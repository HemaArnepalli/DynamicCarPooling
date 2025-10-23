// controllers/adminController.js
import User from "../models/User.js";
import Ride from "../models/Ride.js";
import Booking from "../models/Booking.js";

const ADMIN_EMAIL = "admin@ride.com";
const ADMIN_PASSWORD = "admin123";

// Admin login
export const login = (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.json({ success: true, message: "Login successful" });
  }
  return res.status(401).json({ message: "Invalid admin credentials" });
};

// Dashboard summary
// export const getSummary = async (req, res) => {
//   try {
//     const totalUsers = await User.countDocuments();
//     const totalRides = await Ride.countDocuments();
//     const cancelledRides = await Ride.countDocuments({ status: "CANCELLED" });
//     const totalBookings = await Booking.countDocuments();
//     const totalEarningsData = await Booking.aggregate([
//       { $match: { status: "PAID" } },
//       { $group: { _id: null, total: { $sum: "$fare" } } },
//     ]);
//     const totalEarnings = totalEarningsData[0]?.total || 0;

//     res.json({ totalUsers, totalRides, cancelledRides, totalBookings, totalEarnings });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to fetch summary" });
//   }
// };
export const getSummary = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalRides = await Ride.countDocuments();
    const cancelledRides = await Ride.countDocuments({ status: "CANCELLED" });
    const totalBookings = await Booking.countDocuments();

    // Sum fares directly from rides
    const totalEarningsData = await Ride.aggregate([
      { $match: { status: "UPCOMING" } }, // or "COMPLETED" if you want only finished rides
      { $group: { _id: null, total: { $sum: "$fare" } } },
    ]);

    const totalEarnings = totalEarningsData[0]?.total || 0;
    const commission = totalEarnings * 0.1; // 10% commission

    res.json({
      totalUsers,
      totalRides,
      cancelledRides,
      totalBookings,
      totalEarnings,
      commission,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch summary" });
  }
};


// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};


// ✅ Get all rides
// controllers/adminController.js
export const getRides = async (req, res) => {
  try {
    const rides = await Ride.find();
    res.json(
      rides.map((r) => ({
        id: r._id,
        source: r.origin,        // origin → source
        destination: r.destination,
        status: r.status,
      }))
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch rides" });
  }
};


// ✅ Delete a ride
export const deleteRide = async (req, res) => {
  try {
    await Ride.findByIdAndDelete(req.params.id);
    res.json({ message: "Ride deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete ride" });
  }
};

// ✅ Get all bookings
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("ride")
      .populate("passenger")
      .sort({ createdAt: -1 });

    res.json(
      bookings.map((b) => ({
        id: b._id,
        ride: b.ride,
        passenger: b.passenger,
        status: b.status,
        amountPaid: b.fare,
      }))
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

