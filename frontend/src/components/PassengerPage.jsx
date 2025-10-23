import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaSignInAlt, FaSearch, FaTachometerAlt } from "react-icons/fa";

export default function PassengerPage() {
  const navigate = useNavigate();

  // 🎨 Card container styling
  const cardStyle = {
    background: "rgba(255, 255, 255, 0.12)",
    backdropFilter: "blur(12px)",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
    textAlign: "center",
    minWidth: "320px",
    maxWidth: "420px",
    color: "#fff",
  };

  // 🎨 Button styling
  const btnStyle = (bg) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    width: "230px",
    margin: "12px auto",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: bg,
    color: "#fff",
    fontWeight: "600",
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        fontFamily: "Segoe UI, sans-serif",
        padding: "20px",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1200&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div style={cardStyle}>
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "700",
            marginBottom: "25px",
            color: "#ffeb3b",
          }}
        >
          Passenger Portal
        </h1>

        <p
          style={{
            fontSize: "15px",
            marginBottom: "25px",
            color: "#e0e0e0",
          }}
        >
          Manage your ride sharing experience — register, login, search rides, or
          explore your dashboard.
        </p>

        {/* Navigation Buttons */}
        <button
          onClick={() => navigate("/passenger/register")}
          style={btnStyle("#1976d2")}
        >
          <FaUserPlus /> Register
        </button>

        <button
          onClick={() => navigate("/passenger/login")}
          style={btnStyle("#28a745")}
        >
          <FaSignInAlt /> Login
        </button>

      </div>
    </div>
  );
}
