import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function PassengerRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    role: "PASSENGER",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const API_BASE = import.meta.env.VITE_API_URL;

      const res = await fetch(`${API_BASE}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      alert("Passenger registered successfully!");
      navigate("/passenger/login");
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fdfbfb, #ebedee)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          width: "400px",
          transition: "transform 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
            color: "#1976d2",
          }}
        >
          🧍 Passenger Registration
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={input}
        />
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
        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={formData.contact}
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
          Register
        </button>

        <p style={{ textAlign: "center", marginTop: "15px" }}>
          Already registered?{" "}
          <Link
            to="/passenger/login"
            style={{
              color: "#1976d2",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}

/* 🎨 Styles */
const input = {
  margin: "8px 0",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

const button = {
  marginTop: "20px",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  background: "linear-gradient(90deg, #1976d2, #6c63ff)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "background 0.3s",
};
