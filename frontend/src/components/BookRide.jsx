import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import api from "../api";
import { getUserId, getUserRole, isUserLoggedIn } from "../utils/auth";

export default function BookRide() {
  const { rideId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [ride, setRide] = useState(location.state?.ride || null);
  const [loading, setLoading] = useState(!location.state?.ride);
  const [seats, setSeats] = useState(1);
  const [error, setError] = useState("");

  // payment inputs
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentInProgress, setPaymentInProgress] = useState(false);



  // Fetch ride details
  useEffect(() => {
    if (!ride) {
      setLoading(true);
      api.get(`/rides/${rideId}`)
        .then((res) => setRide(res.data))
        .catch(() => setError("Failed to load ride details"))
        .finally(() => setLoading(false));
    }
  }, [ride, rideId]);

  const totalFare = ride ? (ride.fare || 0) * seats : 0;

  const handlePayAndBook = async () => {
  setError("");
  if (!ride) return setError("No ride selected");
  if (!cardNumber || !expiry || !cvv) return setError("Enter card details");
  if (seats < 1) return setError("Select at least 1 seat");
  if (seats > (ride.availableSeats || 0)) return setError("Not enough seats");

  try {
    setPaymentInProgress(true);
    const passengerid = getUserId();
    
    const payload = {
      rideId,
      passengerId:passengerid, // stored locally
      seatsBooked: seats,
    };
     console.log(payload);
    // Use api.js helper
    const booking = await api.createBooking(payload);

    alert(`Payment successful! Booking confirmed for ${seats} seat(s).`);
    
     navigate("/passenger/passengerclub/dashboard");

  } catch (e) {
    console.error(e);
    setError(e.message || "Payment / booking failed");
  } finally {
    setPaymentInProgress(false);
  }
};

  if (loading) return <p>Loading ride details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!ride) return <p>No ride found.</p>;

  return (
    <div style={container}>
      <h2 style={title}>Book Ride</h2>
      <div style={rideInfo}>
        <div><strong>Ride ID:</strong> {ride._id}</div>
        <div><strong>From:</strong> {ride.origin}</div>
        <div><strong>To:</strong> {ride.destination}</div>
        <div><strong>Fare per seat:</strong> ₹{ride.fare}</div>
        <div><strong>Available seats:</strong> {ride.availableSeats}</div>
      </div>

      <label>
        Seats:
        <input
          type="number"
          min="1"
          max={ride.availableSeats || 1}
          value={seats}
          onChange={(e) => setSeats(Number(e.target.value) || 1)}
          style={input}
        />
      </label>

      <div style={paymentBox}>
        <input
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          style={inputFull}
          disabled={paymentInProgress}
        />
        <div style={inputRow}>
          <input
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            style={inputHalf}
            disabled={paymentInProgress}
          />
          <input
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            style={inputHalf}
            disabled={paymentInProgress}
          />
        </div>
      </div>

      <button
        onClick={handlePayAndBook}
        style={{ ...bookBtn, backgroundColor: paymentInProgress ? "#95a5a6" : "#0984e3" }}
        disabled={paymentInProgress}
      >
        {paymentInProgress ? "Processing..." : `Pay & Book ₹${totalFare}`}
      </button>

      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
    </div>
  );
}

/* --- Styles --- */
const container = { maxWidth: "500px", margin: "40px auto", padding: "25px", borderRadius: "12px", background: "#f9f9f9", boxShadow: "0 6px 15px rgba(0,0,0,0.1)" };
const title = { textAlign: "center", fontSize: "26px", fontWeight: "bold", marginBottom: "20px" };
const rideInfo = { fontSize: "15px", marginBottom: "12px" };
const input = { width: "80px", marginLeft: "10px", padding: "6px", borderRadius: "6px", border: "1px solid #ccc" };
const paymentBox = { background: "#fff", padding: "12px", borderRadius: "8px", boxShadow: "0 4px 10px rgba(0,0,0,0.06)", marginBottom: "12px" };
const inputFull = { width: "100%", padding: "10px", marginBottom: "8px", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" };
const inputRow = { display: "flex", gap: "10px" };
const inputHalf = { flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid #ccc" };
const bookBtn = { width: "100%", padding: "12px", color: "white", fontWeight: "bold", border: "none", borderRadius: "8px", marginTop: "10px" };
