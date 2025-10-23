import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { getUserId, getUserRole, isUserLoggedIn } from "../utils/auth";
import CreateRide from "./CreateRide";
import DriverBookedPassengers from "./DriverBookedPassengers";
import DriverRides from "./DriverRides";
import ProfilePage from "./ProfilePage";
export default function DriverDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("rides"); // rides | booked | create
  const [rides, setRides] = useState([]);
  const driverId = getUserId();

  // Fetch rides
  const fetchRides = async () => {
    try {
      const res = await api.getRidesByDriver(driverId);
      setRides(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/"); // go to home page
  };

    useEffect(() => {
    const fetchRides = async () => {
      try {
        setLoading(true);
        const data = await getDriverRides(driverId); // API call
        setRides(data);
      } catch (err) {
        console.error("Failed to fetch rides:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, [driverId]);

  return (
    <div style={layout}>
      {/* Sidebar */}
      <div style={sidebar}>
        <h2 style={sidebarTitle}>Driver Panel</h2>

        <SidebarButton
          active={activeTab === "rides"}
          onClick={() => setActiveTab("rides")}
        >
          🚘 My Rides
        </SidebarButton>

        <SidebarButton
          active={activeTab === "create"}
          onClick={() => setActiveTab("create")}
        >
          ➕ Create Ride
        </SidebarButton>

        <SidebarButton
          active={activeTab === "booked"}
          onClick={() => setActiveTab("booked")}
        >
          👥 Booked Passengers
        </SidebarButton>

        <SidebarButton active={false} onClick={() => navigate("/driver/profilePage")}>
          👤 Profile
        </SidebarButton>

        <div style={{ flexGrow: 1 }} />
        <SidebarButton
          active={false}
          onClick={handleLogout}
          customStyle={logoutBtn}
        >
          🚪 Logout
        </SidebarButton>
      </div>

      {/* Main Content */}
      <div style={contentArea}>
        <h2 style={title}>Driver Dashboard</h2>
        {activeTab === "rides" && <DriverRides fetchRides={fetchRides} />}
        {activeTab === "create" && <CreateRide onRideCreated={fetchRides} />}
        {activeTab === "booked" && <DriverBookedPassengers />}
      </div>
    </div>
  );
}

/* Sidebar Button Component */
function SidebarButton({ children, active, onClick, customStyle }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "14px",
        margin: "8px 0",
        borderRadius: "8px",
        background: active ? "#ffffff" : "rgba(255,255,255,0.2)",
        color: active ? "#1e88e5" : "#ffffff",
        border: "none",
        fontWeight: "600",
        cursor: "pointer",
        textAlign: "left",
        transition: "0.2s",
        ...(customStyle || {}),
      }}
    >
      {children}
    </button>
  );
}

/* 🎨 Styles */
const layout = {
  display: "flex",
  minHeight: "100vh",
  fontFamily: "Segoe UI, sans-serif",
};

const sidebar = {
  width: "230px",
  background: "#1565c0",
  color: "white",
  display: "flex",
  flexDirection: "column",
  padding: "25px 15px",
  boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
};

const sidebarTitle = {
  fontSize: "22px",
  marginBottom: "25px",
  textAlign: "center",
  fontWeight: "bold",
  letterSpacing: "1px",
};

const logoutBtn = {
  background: "#d32f2f",
  color: "#fff",
  marginTop: "auto",
};

const contentArea = {
  flex: 1,
  background: "#f4f6f8",
  padding: "30px",
  overflowY: "auto",
};

const title = {
  fontSize: "28px",
  color: "#1565c0",
  marginBottom: "25px",
  fontWeight: "700",
};
