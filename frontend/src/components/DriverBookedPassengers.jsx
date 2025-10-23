// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getUserId } from "../utils/auth";
// import { getRidesByDriver } from "../api";

// export default function DriverBookedPassengers() {
//   const navigate = useNavigate();
//   const driverId = getUserId();
//   const [rides, setRides] = useState([]);
//   const [error, setError] = useState("");

//   // Fetch rides for this driver
//   const fetchRides = async () => {
//     try {
//       const res = await getRidesByDriver(driverId);
//       setRides(res || []);
//     } catch (e) {
//       console.error(e);
//       setError("Failed to fetch rides");
//     }
//   };

//   useEffect(() => {
//     if (driverId) fetchRides();
//   }, [driverId]);

//   return (
//     <div style={container}>
//       <h2 style={title}>🚍 Your Rides</h2>
//       {error && <p style={errorText}>{error}</p>}
//       {rides.length === 0 && <p style={noRides}>You have no rides yet.</p>}

//       {rides.map((ride) => (
//         <div key={ride._id} style={rideCard}>
//           <h3 style={rideTitle}>
//             {ride.origin} → {ride.destination}
//           </h3>
//           <p style={rideDate}>
//             <strong>Date & Time:</strong>{" "}
//             {ride.dateTime ? new Date(ride.dateTime).toLocaleString() : "-"}
//           </p>
//           <p>
//             <strong>Status:</strong> {ride.status || "UPCOMING"}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }

// /* Styles */
// const container = {
//   maxWidth: "1000px",
//   margin: "24px auto",
//   padding: "18px",
//   fontFamily: "Arial, sans-serif",
// };
// const title = {
//   textAlign: "center",
//   fontSize: "28px",
//   color: "#1e88e5",
//   marginBottom: "18px",
// };
// const errorText = { color: "#d32f2f", textAlign: "center", fontWeight: "bold" };
// const noRides = { textAlign: "center", color: "#777", fontStyle: "italic" };
// const rideCard = {
//   background: "#e3f2fd",
//   padding: "16px",
//   marginBottom: "16px",
//   borderRadius: "10px",
//   boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
// };
// const rideTitle = { fontSize: "20px", marginBottom: "8px", color: "#1565c0" };
// const rideDate = { marginBottom: "12px", color: "#0d47a1" };
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../utils/auth";
import { getRidesByDriver, getBookingsByRide } from "../api";

export default function DriverBookedPassengers() {
  const navigate = useNavigate();
  const driverId = getUserId();

  const [rides, setRides] = useState([]);
  const [bookingsByRide, setBookingsByRide] = useState({});
  const [error, setError] = useState("");

  // ✅ Fetch all rides by the logged-in driver
  useEffect(() => {
    const fetchRides = async () => {
      try {
        const res = await getRidesByDriver(driverId);
        setRides(Array.isArray(res) ? res : []);
      } catch (e) {
        console.error("Error fetching rides:", e);
        setError("Failed to load your rides.");
      }
    };
    if (driverId) fetchRides();
  }, [driverId]);

  // ✅ Fetch bookings for each ride
  useEffect(() => {
    const fetchBookings = async () => {
      const map = {};
      for (const ride of rides) {
        try {
          const res = await getBookingsByRide(ride._id);
          map[ride._id] = Array.isArray(res) ? res : [];
        } catch (e) {
          console.error(`Error fetching bookings for ride ${ride._id}:`, e);
          map[ride._id] = [];
        }
      }
      setBookingsByRide(map);
    };

    if (rides.length) fetchBookings();
  }, [rides]);

  return (
    <div style={container}>
      <h2 style={title}>🚌 Your Rides & Booked Passengers</h2>

      {error && <p style={errorText}>{error}</p>}
      {rides.length === 0 && <p style={noRides}>You have not created any rides yet.</p>}

      {rides.map((ride) => (
        <div key={ride._id} style={rideCard}>
          <h3 style={rideTitle}>
            {ride.origin} → {ride.destination}
          </h3>
          <p style={rideDate}>
            <strong>Date & Time:</strong>{" "}
            {ride.dateTime ? new Date(ride.dateTime).toLocaleString() : "-"}
          </p>
          <p>
            <strong>Status:</strong> {ride.status || "UPCOMING"}
          </p>

          {/* ✅ Passengers list */}
          {bookingsByRide[ride._id] && bookingsByRide[ride._id].length > 0 ? (
            <div style={passengerSection}>
              <h4 style={passengerTitle}>Booked Passengers:</h4>
              <ul style={passengerList}>
                {bookingsByRide[ride._id].map((b) => (
                  <li key={b._id} style={passengerCard}>
                    <p>
                      <strong>👤 Name:</strong> {b.passenger?.name || "N/A"}
                    </p>
                    <p>
                      <strong>📧 Email:</strong> {b.passenger?.email || "-"}
                    </p>
                    <p>
                      <strong>📞 Contact:</strong> {b.passenger?.contact || "-"}
                    </p>
                    <p>
                      <strong>💺 Seats:</strong> {b.seatsBooked}
                    </p>
                    {/* <p>
                      <strong>🕒 Booked At:</strong>{" "}
                      {b.bookingTime ? new Date(b.bookingTime).toLocaleString() : "-"}
                    </p> */}
                    <p>
                      <strong>📦 Status:</strong>{" "}
                      <span style={statusTag(b.status)}>{b.status}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p style={noPassengers}>No passengers booked this ride yet.</p>
          )}
        </div>
      ))}
    </div>
  );
}

/* ---------- Styles ---------- */
const container = {
  maxWidth: "1000px",
  margin: "24px auto",
  padding: "18px",
  fontFamily: "Arial, sans-serif",
};
const title = {
  textAlign: "center",
  fontSize: "28px",
  color: "#1e88e5",
  marginBottom: "18px",
};
const errorText = {
  color: "#d32f2f",
  textAlign: "center",
  fontWeight: "bold",
};
const noRides = { textAlign: "center", color: "#777", fontStyle: "italic" };
const rideCard = {
  background: "linear-gradient(135deg,#e3f2fd,#bbdefb)",
  padding: "16px",
  marginBottom: "20px",
  borderRadius: "10px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
};
const rideTitle = {
  fontSize: "20px",
  marginBottom: "8px",
  color: "#1565c0",
};
const rideDate = {
  marginBottom: "12px",
  color: "#0d47a1",
};

const passengerSection = { marginTop: "10px" };
const passengerTitle = { color: "#1a237e", fontWeight: "bold", marginBottom: "6px" };
const passengerList = { listStyle: "none", padding: 0 };
const passengerCard = {
  background: "#ffffff",
  padding: "12px",
  marginBottom: "10px",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
};
const noPassengers = {
  fontStyle: "italic",
  color: "#555",
  background: "#f5f5f5",
  padding: "8px",
  borderRadius: "6px",
  textAlign: "center",
};
const statusTag = (status) => ({
  background:
    status === "PENDING"
      ? "#ffb300"
      : status === "APPROVED"
      ? "#43a047"
      : status === "REJECTED"
      ? "#e53935"
      : "#90a4ae",
  color: "white",
  padding: "4px 8px",
  borderRadius: "6px",
  fontWeight: "bold",
});
