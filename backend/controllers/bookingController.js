import Booking from "../models/Booking.js";
import Ride from "../models/Ride.js";

// Create new booking with dummy payment
export const createBooking = async (req, res) => {
  console.log("📥 Booking request:", req.body);
  try {
    const { rideId, passengerId, seatsBooked } = req.body;

    if (!rideId || !passengerId || !seatsBooked) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const ride = await Ride.findById(rideId);
    if (!ride) return res.status(404).json({ message: "Ride not found" });

    if (ride.availableSeats < seatsBooked) {
      return res.status(400).json({ message: "Not enough seats available" });
    }

    const fare = ride.fare * seatsBooked;

    // Create booking with dummy payment
    const booking = await Booking.create({
      ride: rideId,
      passenger: passengerId,
      seatsBooked,
      fare,
      status: "CONFIRMED",
      paymentStatus: "PAID",
    });

    // Reduce available seats
    ride.availableSeats -= seatsBooked;
    await ride.save();

    res.status(201).json({ message: "Booking confirmed with dummy payment", booking });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ message: "Failed to create booking" });
  }
};

// Get bookings by ride
// export const getBookingsByRide = async (req, res) => {
//   try {
//     const { rideId } = req.params;
//     const bookings = await Booking.find({ ride: rideId })
//       .populate("passenger", "name email")
//       .populate("ride");
//     res.json(bookings);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch bookings" });
//   }
// };
export const getBookingsByRide = async (req, res) => {
  try {
    const { rideId } = req.params;

    // Fetch bookings and populate passenger info
    const bookings = await Booking.find({ ride: rideId })
      .populate({
        path: "passenger",         
        select: "name email" // fetch only name and email
      })
      .populate({
        path: "ride",               
        select: "origin destination dateTime fare"
      });

    // Assign default contact
    const bookingsWithDefaultContact = bookings.map(b => ({
      ...b.toObject(),
      passenger: {
        ...b.passenger.toObject(),
        contact: "9645673212" // default contact
      }
    }));

    res.json(bookingsWithDefaultContact);
  } catch (err) {
    console.error("Error fetching bookings by ride:", err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};


/**
 * Get all bookings for a specific passenger
 * GET /bookings/passenger/:passengerId
 */
export const getBookingsByPassenger = async (req, res) => {
  try {
    const { passengerId } = req.params;

    // Validate passengerId
    if (!passengerId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid passenger ID" });
    }

    // Fetch bookings and populate ride & driver info
    const bookings = await Booking.find({ passenger: passengerId })
      .populate({
        path: "ride",
        select: "origin destination dateTime fare availableSeats driver",
        populate: {
          path: "driver",
          select: "name email contact",
        },
      })
      .populate({
        path: "passenger",
        select: "name email contact",
      })
      .sort({ createdAt: -1 }); // latest bookings first

    res.json(bookings);
  } catch (err) {
    console.error("Error fetching passenger bookings:", err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};
