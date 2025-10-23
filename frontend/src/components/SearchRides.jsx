import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function SearchRides() {
  const navigate = useNavigate();
  const outletContext = useOutletContext();
  const passenger = outletContext?.passenger || null; // ✅ safe access
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [rides, setRides] = useState([]);
  const [error, setError] = useState("");
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    if (!passenger || passenger.role !== "PASSENGER") {
      navigate("/passenger/login", { replace: true });
    }
  }, [navigate, passenger]);

  const handleSearch = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/rides/search?origin=${origin}&destination=${destination}`
      );

      if (!res.ok) {
        if (res.status === 404) {
          setRides([]);
          setError("No rides found for this route.");
          return;
        } else {
          throw new Error("Server error. Please try again later.");
        }
      }

      const data = await res.json();
      const validRides = data.filter((ride) => ride.availableSeats > 0);

      setRides(validRides);
      setError(validRides.length ? "" : "No rides found for this route.");
    } catch (err) {
      console.error("Ride search error:", err);
      setError("Something went wrong while fetching rides.");
    }
  };

  return (
    <div style={container}>
      <h2 style={title}>Search Rides</h2>

      <div style={searchBox}>
        <input
          type="text"
          placeholder="Origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          style={input}
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          style={input}
        />
        <button style={searchBtn} onClick={handleSearch}>
          Search
        </button>
      </div>

      {error && <p style={errorText}>{error}</p>}

      <div style={ridesContainer}>
        {rides.map((ride) => (
          <div key={ride.id || ride._id} style={rideCard}>
            <div>
              <p>
                <strong>Driver:</strong> {ride?.driver?.name || "N/A"}
              </p>
              <p>
                <strong>From:</strong> {ride.origin} &nbsp;
                <strong>To:</strong> {ride.destination} &nbsp;
                <strong>Seats:</strong> {ride.availableSeats}
              </p>
              <p>
                <strong>Fare:</strong> ₹{ride.fare || "—"}
              </p>
            </div>
            <button
              style={bookBtn}
              onClick={() =>
                navigate(`/passenger/passengerclub/book/${ride._id}`, {
                  state: { ride },
                })
              }
            >
              Book Ride
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 🎨 Styles */
const container = {
  maxWidth: "700px",
  margin: "30px auto",
  padding: "20px",
  background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
  borderRadius: "15px",
  fontFamily: "Arial, sans-serif",
  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
};
const title = { fontSize: "28px", fontWeight: "bold", color: "#1e3c72", marginBottom: "20px" };
const searchBox = {
  display: "flex",
  gap: "10px",
  marginBottom: "20px",
  flexWrap: "wrap",
  justifyContent: "center",
};
const input = {
  padding: "10px 15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px",
  flex: "1 1 200px",
  outline: "none",
};
const searchBtn = {
  padding: "10px 20px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#1976d2",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.3s",
};
const ridesContainer = { display: "grid", gap: "15px" };
const rideCard = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px",
  borderRadius: "12px",
  backgroundColor: "white",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
};
const bookBtn = {
  backgroundColor: "#28a745",
  color: "white",
  padding: "10px 20px",
  borderRadius: "8px",
  border: "none",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.3s",
};
const errorText = {
  color: "#d32f2f",
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: "15px",
};
