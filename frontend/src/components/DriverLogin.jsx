import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { saveToken, saveUser } from "../utils/auth";

export default function DriverLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const API_BASE = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_BASE}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      // Save user and token (optional, for later use)
      saveToken(data.token);
      saveUser(data.user);

      alert("Login successful!");
      // ✅ Directly navigate to driver dashboard
      navigate("/driver/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.message || "Login failed");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f4f8, #d0e8ff)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          width: "350px",
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.2s",
        }}
      >
        <h2
          style={{ textAlign: "center", marginBottom: "25px", color: "#1976d2" }}
        >
          🚗 Driver Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={input}
        />

        {error && (
          <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
            {error}
          </p>
        )}

        <button type="submit" style={button}>
          Login
        </button>

        <p style={{ textAlign: "center", marginTop: "15px" }}>
          Don’t have an account?{" "}
          <Link
            to="/driver/register"
            style={{ color: "#1976d2", textDecoration: "none", fontWeight: "bold" }}
          >
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  );
}

const input = {
  margin: "10px 0",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

const button = {
  marginTop: "20px",
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  background: "linear-gradient(90deg, #1976d2, #28a745)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "background 0.3s",
};
