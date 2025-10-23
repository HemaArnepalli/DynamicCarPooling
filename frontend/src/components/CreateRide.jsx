// import React, { useState } from "react";
// import { createRide, calculateFare } from "../api";
// import { getUserId } from "../utils/auth";

// export default function CreateRide({ onRideCreated }) {
//   const [origin, setOrigin] = useState("");
//   const [destination, setDestination] = useState("");
//   const [dateTime, setDateTime] = useState("");
//   const [totalSeats, setTotalSeats] = useState(1);
//   const [estimatedFare, setEstimatedFare] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [requiresApproval, setRequiresApproval] = useState(false);

//   // Reset fare when input changes
//   const handleChange = (setter) => (e) => {
//     setter(e.target.value);
//     setEstimatedFare(null);
//   };

//   // ---------------- Estimate Fare ----------------
//   const handleEstimateFare = async () => {
//     if (!origin || !destination)
//       return alert("Please enter both origin and destination.");

//     try {
//       setLoading(true);
//       const res = await calculateFare(origin, destination, totalSeats);
//       setEstimatedFare(typeof res === "object" ? res.fare : res);
//     } catch (err) {
//       console.error("Error calculating fare:", err);
//       alert("Failed to estimate fare. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------- Submit Ride ----------------
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const driverId = getUserId();
//     if (!driverId) return alert("Please login again. No driver detected.");
//     if (!dateTime) return alert("Please select date & time.");

//     const payload = {
//       origin,
//       destination,
//       dateTime,
//       totalSeats: Number(totalSeats),
//       driverId, // ✅ backend expects driverId
//       requiresApproval,
//     };

//     try {
//       await createRide(payload);

//       // Reset form
//       setOrigin("");
//       setDestination("");
//       setDateTime("");
//       setTotalSeats(1);
//       setEstimatedFare(null);
//       setRequiresApproval(false);

//       alert("✅ Ride created successfully!");
//       if (onRideCreated) onRideCreated();
//     } catch (err) {
//       console.error("Error creating ride:", err);
//       alert("❌ Failed to create ride. Please try again.");
//     }
//   };

//   // ---------------- JSX ----------------
//   return (
//     <form
//       onSubmit={handleSubmit}
//       style={{
//         background: "#fff",
//         padding: "30px",
//         borderRadius: "12px",
//         boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
//         maxWidth: "450px",
//         margin: "40px auto",
//         display: "flex",
//         flexDirection: "column",
//         gap: "14px",
//         fontFamily: "Arial, sans-serif",
//       }}
//     >
//       <h3
//         style={{
//           fontSize: "22px",
//           fontWeight: "bold",
//           textAlign: "center",
//           color: "#2d3436",
//         }}
//       >
//         🚘 Create Ride
//       </h3>

//       <input
//         type="text"
//         placeholder="Origin"
//         value={origin}
//         onChange={handleChange(setOrigin)}
//         required
//         style={inputStyle}
//       />

//       <input
//         type="text"
//         placeholder="Destination"
//         value={destination}
//         onChange={handleChange(setDestination)}
//         required
//         style={inputStyle}
//       />

//       <input
//         type="datetime-local"
//         value={dateTime}
//         onChange={handleChange(setDateTime)}
//         required
//         style={inputStyle}
//       />

//       <input
//         type="number"
//         min="1"
//         value={totalSeats}
//         onChange={handleChange(setTotalSeats)}
//         required
//         style={inputStyle}
//       />

//       <label style={{ fontSize: "14px", color: "#2d3436" }}>
//         <input
//           type="checkbox"
//           checked={requiresApproval}
//           onChange={(e) => setRequiresApproval(e.target.checked)}
//           style={{ marginRight: "8px" }}
//         />
//         Require driver approval for bookings
//       </label>

//       <button
//         type="button"
//         onClick={handleEstimateFare}
//         disabled={loading}
//         style={buttonStyle}
//       >
//         {loading ? "Calculating..." : "Estimate Fare"}
//       </button>

//       {estimatedFare !== null && (
//         <p
//           style={{
//             textAlign: "center",
//             fontWeight: "bold",
//             color: "#27ae60",
//             margin: "5px 0",
//           }}
//         >
//           Estimated Fare: ₹{Number(estimatedFare).toFixed(2)}
//         </p>
//       )}

//       <button type="submit" style={{ ...buttonStyle, background: "#0984e3" }}>
//         Create Ride
//       </button>
//     </form>
//   );
// }

// // ---------------- Styles ----------------
// const inputStyle = {
//   padding: "12px",
//   borderRadius: "8px",
//   border: "1px solid #ccc",
//   fontSize: "14px",
// };

// const buttonStyle = {
//   background: "#6c5ce7",
//   color: "#fff",
//   padding: "12px",
//   border: "none",
//   borderRadius: "8px",
//   fontSize: "15px",
//   cursor: "pointer",
//   transition: "0.3s",
// };
import React, { useState } from "react";
import { createRide, calculateFareByName } from "../api"; // ✅ use your new API
import { getUserId } from "../utils/auth";

export default function CreateRide({ onRideCreated }) {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [totalSeats, setTotalSeats] = useState(1);
  const [estimatedFare, setEstimatedFare] = useState(null);
  const [loading, setLoading] = useState(false);
  const [requiresApproval, setRequiresApproval] = useState(false);

  // Reset fare when input changes
  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    setEstimatedFare(null);
  };

  // ---------------- Estimate Fare ----------------
  const handleEstimateFare = async () => {
    if (!origin || !destination)
      return alert("Please enter both origin and destination.");

    try {
      setLoading(true);
      const res = await calculateFareByName(origin, destination, totalSeats);
      if (!res?.fare) return alert("Failed to calculate fare. Try different locations.");
      setEstimatedFare(res.fare);
    } catch (err) {
      console.error("Error calculating fare:", err);
      alert("Failed to estimate fare. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Submit Ride ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const driverId = getUserId();
    if (!driverId) return alert("Please login again. No driver detected.");
    if (!dateTime) return alert("Please select date & time.");
    if (estimatedFare === null) return alert("Please calculate fare first.");

    const payload = {
      origin,
      destination,
      dateTime,
      totalSeats: Number(totalSeats),
      driverId,
      requiresApproval,
      fare: estimatedFare, // ✅ send calculated fare
    };

    try {
      await createRide(payload);

      // Reset form
      setOrigin("");
      setDestination("");
      setDateTime("");
      setTotalSeats(1);
      setEstimatedFare(null);
      setRequiresApproval(false);

      alert("✅ Ride created successfully!");
      if (onRideCreated) onRideCreated();
    } catch (err) {
      console.error("Error creating ride:", err);
      alert("❌ Failed to create ride. Please try again.");
    }
  };

  // ---------------- JSX ----------------
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
        maxWidth: "450px",
        margin: "40px auto",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h3
        style={{
          fontSize: "22px",
          fontWeight: "bold",
          textAlign: "center",
          color: "#2d3436",
        }}
      >
        🚘 Create Ride
      </h3>

      <input
        type="text"
        placeholder="Origin"
        value={origin}
        onChange={handleChange(setOrigin)}
        required
        style={inputStyle}
      />

      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={handleChange(setDestination)}
        required
        style={inputStyle}
      />

      <input
        type="datetime-local"
        value={dateTime}
        onChange={handleChange(setDateTime)}
        required
        style={inputStyle}
      />

      <input
        type="number"
        min="1"
        value={totalSeats}
        onChange={handleChange(setTotalSeats)}
        required
        style={inputStyle}
      />

      <label style={{ fontSize: "14px", color: "#2d3436" }}>
        <input
          type="checkbox"
          checked={requiresApproval}
          onChange={(e) => setRequiresApproval(e.target.checked)}
          style={{ marginRight: "8px" }}
        />
        Require driver approval for bookings
      </label>

      <button
        type="button"
        onClick={handleEstimateFare}
        disabled={loading}
        style={buttonStyle}
      >
        {loading ? "Calculating..." : "Estimate Fare"}
      </button>

      {estimatedFare !== null && (
        <p
          style={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#27ae60",
            margin: "5px 0",
          }}
        >
          Estimated Fare: ₹{Number(estimatedFare).toFixed(2)}
        </p>
      )}

      <button type="submit" style={{ ...buttonStyle, background: "#0984e3" }}>
        Create Ride
      </button>
    </form>
  );
}

// ---------------- Styles ----------------
const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

const buttonStyle = {
  background: "#6c5ce7",
  color: "#fff",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  fontSize: "15px",
  cursor: "pointer",
  transition: "0.3s",
};
