import React, { useEffect, useState } from "react";
import api from "../api";
import { getUser } from "../utils/auth";

export default function DriverRides() {
  const driver = getUser();
  const driverId = driver?.id || driver?._id;
  const [rides, setRides] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!driverId) {
      console.warn("⚠️ No driver ID found. Please log in again.");
      setError("Driver not found. Please login again.");
      return;
    }

    const fetchRides = async () => {
      setLoading(true);
      setError("");
      try {
        console.log("🚗 Fetching rides for driver:", driverId);
        const data = await api.getRidesByDriver(driverId);
        console.log("✅ Rides received from backend:", data);
        setRides(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("❌ Error fetching rides:", err);
        setError("Failed to fetch rides. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, [driverId]);

  // 🗑️ Delete ride
  const handleDelete = async (rideId) => {
    if (!window.confirm("Are you sure you want to delete this ride?")) return;
    try {
      await api.deleteRide(rideId);
      setRides((prev) => prev.filter((ride) => ride._id !== rideId));
      alert("✅ Ride deleted successfully");
    } catch (err) {
      console.error("❌ Error deleting ride:", err);
      alert("Failed to delete ride. Please try again later.");
    }
  };

  // ✅ Mark ride as completed
  const handleMarkCompleted = async (rideId) => {
    if (!window.confirm("Mark this ride as completed?")) return;
    try {
      await api.updateRideStatus(rideId, "completed");
      setRides((prev) =>
        prev.map((ride) =>
          ride._id === rideId ? { ...ride, status: "completed" } : ride
        )
      );
      alert("✅ Ride marked as completed!");
    } catch (err) {
      console.error("❌ Error updating ride status:", err);
      alert("Failed to update ride status.");
    }
  };

  return (
    <div style={container}>
      <h2 style={title}>Your Rides</h2>

      {loading && <p style={statusText}>Loading rides...</p>}
      {error && <p style={errorText}>{error}</p>}
      {!loading && rides.length === 0 && !error && (
        <p style={statusText}>No rides found.</p>
      )}

      <ul style={rideList}>
        {rides.map((ride) => (
          <li key={ride._id} style={rideCard}>
            <p><strong>From:</strong> {ride.origin || "-"}</p>
            <p><strong>To:</strong> {ride.destination || "-"}</p>
            <p><strong>Seats Available:</strong> {ride.availableSeats ?? "-"}</p>
            <p><strong>Status:</strong> {ride.status || "upcoming"}</p>
            <p>
              <strong>Date & Time:</strong>{" "}
              {ride.dateTime
                ? new Date(ride.dateTime).toLocaleString()
                : "N/A"}
            </p>

            {/* 🎯 ACTION BUTTONS */}
            <div style={buttonContainer}>
              {ride.status !== "completed" && (
                <button
                  style={completeBtn}
                  onClick={() => handleMarkCompleted(ride._id)}
                >
                  ✅ Mark as Completed
                </button>
              )}

              {ride.status === "completed" && (
                <button
                  style={reviewBtn}
                  onClick={() => alert("⭐ Review feature coming soon!")}
                >
                  ⭐ Leave Review
                </button>
              )}

              <button
                style={deleteBtn}
                onClick={() => handleDelete(ride._id)}
              >
                🗑️ Delete Ride
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* 🎨 Styles */
const container = {
  maxWidth: "900px",
  margin: "30px auto",
  padding: "20px",
  fontFamily: "'Segoe UI', sans-serif",
};

const title = {
  textAlign: "center",
  fontSize: "28px",
  marginBottom: "25px",
  color: "#1e88e5",
};

const statusText = {
  textAlign: "center",
  color: "#555",
  fontStyle: "italic",
};

const errorText = {
  textAlign: "center",
  color: "#d32f2f",
  fontWeight: "bold",
};

const rideList = {
  listStyle: "none",
  padding: 0,
};

const rideCard = {
  background: "linear-gradient(135deg, #e0f7fa, #b2ebf2)",
  marginBottom: "20px",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
  fontSize: "15px",
  position: "relative",
};

const buttonContainer = {
  display: "flex",
  gap: "10px",
  marginTop: "15px",
};

const deleteBtn = {
  backgroundColor: "#e53935",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "background 0.3s",
};

const completeBtn = {
  backgroundColor: "#43a047",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "background 0.3s",
};

const reviewBtn = {
  backgroundColor: "#fb8c00",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "background 0.3s",
};
