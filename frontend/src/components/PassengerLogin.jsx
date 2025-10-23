 import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PassengerLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Redirect if already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      navigate("/passenger/passengerclub", { replace: true });
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    console.log("🚀 Starting Passenger Login...");
    console.log("📧 Email entered:", email);
    console.log("🔒 Password entered:", password ? "••••••" : "(empty)");

    try {
      const API_BASE = import.meta.env.VITE_API_URL;
      console.log("🌍 API Base URL:", API_BASE);

      const res = await fetch(`${API_BASE}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: "PASSENGER" }),
      });

      const data = await res.json();
      console.log("📦 Parsed JSON data:", data);

      if (!res.ok) throw new Error(data.message || "Login failed");
      if (!data.user) throw new Error("Invalid backend response. 'user' missing.");

      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(data.user));
      console.log("💾 User saved:", data.user);

      alert("✅ Login successful!");

      // ✅ Replace history to prevent back button returning to login
      navigate("/passenger/passengerclub", { replace: true });
    } catch (err) {
      console.error("💥 Login failed:", err);
      setError(err.message || "Login failed. Please check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={title}>Passenger Login</h2>
        <p style={subtitle}>Sign in to continue your journey</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="✉️  Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={input}
            required
          />
          <input
            type="password"
            placeholder="🔒  Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={input}
            required
          />
          <button type="submit" style={button} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && <p style={errorText}>{error}</p>}
      </div>
    </div>
  );
}

/* 🎨 Styles */
const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  background: "linear-gradient(135deg, #dbe6f6, #c5796d)",
  fontFamily: "Segoe UI, sans-serif",
};
const card = {
  width: "380px",
  padding: "45px 35px",
  borderRadius: "20px",
  boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
  backgroundColor: "#ffffff",
  textAlign: "center",
};
const title = {
  marginBottom: "12px",
  color: "#2f3640",
  fontSize: "26px",
  fontWeight: "700",
};
const subtitle = { marginBottom: "28px", color: "#555", fontSize: "14px" };
const input = {
  width: "100%",
  padding: "14px 16px",
  margin: "10px 0",
  borderRadius: "10px",
  border: "1px solid #ddd",
  fontSize: "15px",
  outline: "none",
};
const button = {
  width: "100%",
  padding: "14px",
  marginTop: "20px",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "#1976d2",
  color: "white",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
};
const errorText = { color: "#d32f2f", marginTop: "18px", fontSize: "14px" };
