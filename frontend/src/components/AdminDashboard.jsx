// frontend/src/components/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAdminSummary } from "../api"; // admin API helper

export default function AdminDashboard() {
  const [summary, setSummary] = useState({
    totalUsers: 0,
    totalRides: 0,
    totalBookings: 0,
    cancelledRides: 0,
    totalEarnings: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const data = await getAdminSummary(); // fetch summary from backend
      setSummary(data);
    } catch (err) {
      console.error("Error fetching admin summary:", err);
      alert("Failed to load admin dashboard summary.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f4f6f9" }}>
      {/* Sidebar */}
      <div style={sidebar}>
        <h2 style={logo}>Ride Admin</h2>
        <nav style={nav}>
          <Link style={navItem} to="/admin/dashboard">📊 Dashboard</Link>
          {/* <Link style={navItem} to="/admin/rides">🚗 Manage Rides</Link> */}
          <Link style={navItem} to="/admin/bookings">📖 Manage Bookings</Link>
          {/* <Link style={navItem} to="/admin/users">👥 Manage Users</Link>
          <Link style={navItem} to="/admin/daily-reports">📅 Daily Reports</Link> */}
        </nav>
        <button style={logoutBtn} onClick={handleLogout}>Logout</button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "30px" }}>
        <h1 style={{ marginBottom: "20px" }}>📊 Dashboard</h1>
        <div style={cardGrid}>
          <Card title="Total Users" value={summary.totalUsers} color="#1976d2" />
          <Card title="Total Rides" value={summary.totalRides} color="#388e3c" />
          <Card title="Total Bookings" value={summary.totalBookings} color="#f57c00" />
          <Card title="Cancelled Rides" value={summary.cancelledRides} color="#d32f2f" />
          <Card title="Earnings" value={`₹${summary.totalEarnings}`} color="#512da8" />
          <Card
            title="Commission"
            value={`₹${(summary.totalEarnings * 0.1).toFixed(2)}`}
            color="#0097a7"
          />
        </div>
      </div>
    </div>
  );
}

// Card Component
function Card({ title, value, color }) {
  return (
    <div style={{ ...card, borderTop: `5px solid ${color}` }}>
      <h3 style={{ color }}>{title}</h3>
      <p style={{ fontSize: "22px", fontWeight: "bold" }}>{value ?? "—"}</p>
    </div>
  );
}

// Styles
const sidebar = {
  width: "250px",
  background: "#263238",
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "20px",
};
const logo = { fontSize: "22px", fontWeight: "bold", marginBottom: "20px" };
const nav = { display: "flex", flexDirection: "column", gap: "15px" };
const navItem = {
  color: "white",
  textDecoration: "none",
  fontSize: "16px",
  padding: "10px",
  borderRadius: "6px",
  transition: "0.3s",
};
const logoutBtn = {
  marginTop: "20px",
  padding: "10px",
  background: "#d32f2f",
  border: "none",
  color: "white",
  borderRadius: "6px",
  cursor: "pointer",
};
const cardGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px",
};
const card = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  textAlign: "center",
};
