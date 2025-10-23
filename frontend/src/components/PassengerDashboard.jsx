import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function PassengerDashboard() {
  const navigate = useNavigate();
  const { passenger } = useOutletContext(); // ✅ get passenger from parent
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const API_BASE = import.meta.env.VITE_API_URL;

  // Fake card details
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentInProgress, setPaymentInProgress] = useState(false);

  /** Redirect if not a passenger */
  useEffect(() => {
    if (!passenger || passenger.role !== "PASSENGER") {
      navigate("/passenger/login", { replace: true });
    }
  }, [navigate, passenger]);

  /** Fetch passenger bookings */
  useEffect(() => {
    if (passenger) fetchBookings();
  }, [passenger]);

  const fetchBookings = async () => {
    setLoading(true);
    setError("");

    try {
      // ✅ Define userId here inside the function
      const userId = passenger.id || passenger._id;
      console.log("🌐 Fetching bookings for userId:", userId);

      const res = await fetch(`${API_BASE}/bookings/passenger/${userId}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch bookings");

      setBookings(Array.isArray(data) ? data : [data]);
      console.log("✅ Bookings fetched:", data);
    } catch (err) {
      console.error("Fetch bookings error:", err);
      setError(err.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (bookingId) => {
    if (!cardNumber || !expiry || !cvv) {
      setError("Please fill in all payment details.");
      return;
    }

    setError("");
    setPaymentInProgress(true);

    try {
      const res = await fetch(`${API_BASE}/bookings/payment/${bookingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardNumber, expiry, cvv }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Payment failed");

      alert("✅ Payment successful!");
      fetchBookings();
    } catch (err) {
      console.error("Payment error:", err);
      setError(err.message || "Payment failed");
    } finally {
      setPaymentInProgress(false);
    }
  };

  if (loading) return <p>⏳ Loading bookings...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!bookings.length) return <p>No bookings found.</p>;

  return (
    <div style={{ maxWidth: "900px", margin: "30px auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", fontSize: "28px", marginBottom: "20px" }}>
        🎟️ My Bookings
      </h2>

      {bookings.map((b) => (
        <div
          key={b._id}
          style={{
            background: "#fff3cd",
            padding: "16px",
            marginBottom: "14px",
            borderRadius: "8px",
          }}
        >
          <p>
            <strong>From:</strong> {b.ride?.origin} → <strong>To:</strong>{" "}
            {b.ride?.destination}
          </p>
          <p>
            <strong>Date & Time:</strong>{" "}
            {b.ride?.dateTime ? new Date(b.ride.dateTime).toLocaleString() : "-"}
          </p>
          <p>
            <strong>Seats:</strong> {b.seatsBooked} | <strong>Status:</strong>{" "}
            {b.status}
          </p>

          {b.status === "APPROVED" && (
            <div
              style={{
                background: "#f8f9fa",
                padding: "12px",
                borderRadius: "8px",
                marginTop: "10px",
              }}
            >
              <input
                type="text"
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
              />
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  style={{ flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid #ccc", maxWidth: "50%" }}
                />
                <input
                  type="password"
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  style={{ flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid #ccc", maxWidth: "50%" }}
                />
              </div>
              <button
                onClick={() => handlePayment(b._id)}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "8px",
                  background: "#28a745",
                  color: "white",
                  fontWeight: "bold",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
                disabled={paymentInProgress}
              >
                {paymentInProgress ? "Processing..." : "Pay & Confirm"}
              </button>
            </div>
          )}

          {b.status === "CONFIRMED" && (
            <p style={{ color: "green" }}>✅ Booking confirmed!</p>
          )}
        </div>
      ))}
    </div>
  );
}
