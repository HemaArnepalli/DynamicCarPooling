import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../api";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await adminLogin(email, password);
      localStorage.setItem("admin", "true");
      navigate("/admin/dashboard");
    } catch (err) {
      alert(err.message || "Login failed");
    }
  };

  return (
    <div style={container}>
      <form style={card} onSubmit={handleLogin}>
        <h2>Admin Login</h2>
        <input
          style={input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button style={btn} type="submit">Login</button>
      </form>
    </div>
  );
}

// Styles
const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "#f0f2f5"
};
const card = {
  background: "white",
  padding: "40px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  width: "350px"
};
const input = {
  padding: "12px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  fontSize: "16px"
};
const btn = {
  padding: "12px",
  background: "#1976d2",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};
