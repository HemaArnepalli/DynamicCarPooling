// import Ride from "../models/Ride.js";
// import { calculateFare } from "../utils/fare.js";
// // Create ride
// export const createRide = async (req, res) => {
//   try {
//     const { origin, destination, dateTime, totalSeats, driverId, requiresApproval } = req.body;

   
//     const ride = new Ride({
//   origin,
//   destination,
//   dateTime,
//   totalSeats,
//   availableSeats: totalSeats,
//   driver: driverId, // ✅ matches frontend payload
//   requiresApproval,
//   status: "UPCOMING",
// });

//     await ride.save();
//     res.status(201).json(ride);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get rides by driver
// export const getDriverRides = async (req, res) => {
//   try {
//     const driverId = req.params.driverId;
//     const rides = await Ride.find({ driver: driverId }).sort({ dateTime: 1 });
//     res.json(rides);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Update ride (like status)
// export const updateRide = async (req, res) => {
//   try {
//     const ride = await Ride.findById(req.params.rideId);
//     if (!ride) return res.status(404).json({ message: "Ride not found" });

//     const { status, availableSeats } = req.body;
//     if (status) ride.status = status;
//     if (availableSeats !== undefined) ride.availableSeats = availableSeats;

//     await ride.save();
//     res.json(ride);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Delete ride
// export const deleteRide = async (req, res) => {
//   try {
//     const ride = await Ride.findByIdAndDelete(req.params.rideId);
//     if (!ride) return res.status(404).json({ message: "Ride not found" });
//     res.json({ message: "Ride deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Calculate fare (simple example)
// import { getDistanceKm } from "../utils/distance.js";



// export const calculateFare = async (req, res) => {
//   try {
//     const { origin, destination, passengers = 1 } = req.query;

//     if (!origin || !destination)
//       return res.status(400).json({ message: "Origin and destination required" });

//     const distance = await getDistanceKm(origin, destination);

//     const baseFare = Number(process.env.FARE_BASE || 30);
//     const perKm = Number(process.env.FARE_PER_KM || 12);
//     const minimumFare = Number(process.env.FARE_MINIMUM || 50);

//     let fare = baseFare + distance * perKm;
//     fare = Math.max(fare, minimumFare);
//     fare += passengers * 10; // per passenger charge

//     res.json({ fare, distance });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to calculate fare" });
//   }
// };



// // PATCH /api/rides/:rideId/status
// export const updateRideStatus = async (req, res) => {
//   try {
//     const { rideId } = req.params;
//     const { status } = req.body;

//     if (!["upcoming", "ongoing", "completed", "cancelled"].includes(status)) {
//       return res.status(400).json({ message: "Invalid status value" });
//     }

//     const ride = await Ride.findByIdAndUpdate(
//       rideId,
//       { status },
//       { new: true }
//     );

//     if (!ride) return res.status(404).json({ message: "Ride not found" });

//     res.json(ride);
//   } catch (err) {
//     console.error("❌ Error updating ride status:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

  


// export const searchRides = async (req, res) => {
//   try {
//     const { origin, destination } = req.query;

//     if (!origin || !destination) {
//       return res.status(400).json({ message: "Origin and destination are required." });
//     }

//     // Find rides and populate driver details
//     const rides = await Ride.find({
//       origin: { $regex: origin, $options: "i" },
//       destination: { $regex: destination, $options: "i" },
//       availableSeats: { $gt: 0 },
//     })
//       .populate("driver", "name email")  // ✅ populate only needed fields
//       .sort({ dateTime: 1 });

//     if (rides.length === 0) {
//       return res.status(200).json([]); // ✅ no error, just empty array
//     }

//     // Optionally compute a fare if not already set
//     const ridesWithFare = rides.map((ride) => {
//       if (!ride.fare || ride.fare === 0) {
//         // example simple fare logic
//         const baseFare = 50;
//         const distanceFare = 10 * 10; // assume 10km * ₹10
//         ride.fare = baseFare + distanceFare;
//       }
//       return ride;
//     });

//     return res.status(200).json(ridesWithFare);
//   } catch (error) {
//     console.error("Error searching for rides:", error);
//     return res.status(500).json({ message: "Server error. Please try again later." });
//   }
// };

// // Get ride by ID
// export const getRideById = async (req, res) => {
//   try {
//     const ride = await Ride.findById(req.params.rideId).populate("driver", "name");
//     if (!ride) return res.status(404).json({ message: "Ride not found" });
//     res.json(ride);
//   } catch (err) {
//     console.error("Error fetching ride:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
import Ride from "../models/Ride.js";
import { getDistanceKm } from "../utils/distance.js"; // your OSRM distance util

// ---------------- Create Ride ----------------
export const createRide = async (req, res) => {
  try {
    const { origin, destination, dateTime, totalSeats, driverId, requiresApproval, fare } = req.body;

    const ride = new Ride({
      origin,
      destination,
      dateTime,
      totalSeats,
      availableSeats: totalSeats,
      driver: driverId,
      requiresApproval,
      status: "UPCOMING",
      fare: fare || 0, // use frontend-provided fare if available, otherwise 0
    });

    await ride.save();
    res.status(201).json(ride);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- Get Rides By Driver ----------------
export const getDriverRides = async (req, res) => {
  try {
    const driverId = req.params.driverId;
    const rides = await Ride.find({ driver: driverId }).sort({ dateTime: 1 });
    res.json(rides);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- Update Ride ----------------
export const updateRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.rideId);
    if (!ride) return res.status(404).json({ message: "Ride not found" });

    const { status, availableSeats } = req.body;
    if (status) ride.status = status;
    if (availableSeats !== undefined) ride.availableSeats = availableSeats;

    await ride.save();
    res.json(ride);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- Delete Ride ----------------
export const deleteRide = async (req, res) => {
  try {
    const ride = await Ride.findByIdAndDelete(req.params.rideId);
    if (!ride) return res.status(404).json({ message: "Ride not found" });
    res.json({ message: "Ride deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- Calculate Fare Route ----------------
export const calculateFare = async (req, res) => {
  try {
    const { origin, destination, passengers = 1 } = req.query;

    if (!origin || !destination)
      return res.status(400).json({ message: "Origin and destination required" });

    const distance = await getDistanceKm(origin, destination);

    const baseFare = Number(process.env.FARE_BASE || 30);
    const perKm = Number(process.env.FARE_PER_KM || 12);
    const minimumFare = Number(process.env.FARE_MINIMUM || 50);

    let fare = baseFare + distance * perKm;
    fare = Math.max(fare, minimumFare);
    fare += passengers * 10; // optional per passenger charge

    res.json({ fare, distance });
  } catch (err) {
    console.error("❌ Error calculating fare:", err);
    res.status(500).json({ message: "Failed to calculate fare" });
  }
};

// ---------------- Update Ride Status ----------------
export const updateRideStatus = async (req, res) => {
  try {
    const { rideId } = req.params;
    const { status } = req.body;

    if (!["upcoming", "ongoing", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const ride = await Ride.findByIdAndUpdate(
      rideId,
      { status },
      { new: true }
    );

    if (!ride) return res.status(404).json({ message: "Ride not found" });

    res.json(ride);
  } catch (err) {
    console.error("❌ Error updating ride status:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Search Rides ----------------
export const searchRides = async (req, res) => {
  try {
    const { origin, destination } = req.query;

    if (!origin || !destination) {
      return res.status(400).json({ message: "Origin and destination are required." });
    }

    const rides = await Ride.find({
      origin: { $regex: origin, $options: "i" },
      destination: { $regex: destination, $options: "i" },
      availableSeats: { $gt: 0 },
    })
      .populate("driver", "name email")
      .sort({ dateTime: 1 });

    if (rides.length === 0) return res.status(200).json([]);

    return res.status(200).json(rides);
  } catch (error) {
    console.error("Error searching for rides:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// ---------------- Get Ride By ID ----------------
export const getRideById = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.rideId).populate("driver", "name");
    if (!ride) return res.status(404).json({ message: "Ride not found" });
    res.json(ride);
  } catch (err) {
    console.error("Error fetching ride:", err);
    res.status(500).json({ message: "Server error" });
  }
};
