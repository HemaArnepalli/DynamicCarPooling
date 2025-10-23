// src/pages/ManageBookings.js
import React, { useEffect, useState } from "react";
import { getBookings } from "../api";

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await getBookings();
      setBookings(data);
    } catch (err) {
      alert("Failed to fetch bookings: " + err.message);
    }
  };

  return (
    <div style={{ padding: "30px", minHeight: "100vh", background: "#f9fafb" }}>
      <h2 style={{ marginBottom: "20px" }}>Manage Bookings</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: "8px" }}>
        <thead>
          <tr style={{ background: "#4f46e5", color: "white", textAlign: "left" }}>
            {["ID","Ride ID","Passenger","Status"].map(h => <th key={h} style={{ padding: "12px" }}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? bookings.map(b => (
            <tr key={b.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td style={{ padding: "12px" }}>{b.id}</td>
              <td style={{ padding: "12px" }}>{b.ride?.id || "N/A"}</td>
              <td style={{ padding: "12px" }}>{b.passenger?.name || "N/A"}</td>
              <td style={{ padding: "12px" }}>
                <span style={{ padding: "6px 12px", borderRadius: "12px", fontSize: "12px", fontWeight: "600", color: b.status === "CONFIRMED" ? "#065f46" : "#92400e", background: b.status === "CONFIRMED" ? "#d1fae5" : "#fef3c7" }}>
                  {b.status || "Unknown"}
                </span>
              </td>
            </tr>
          )) : <tr><td colSpan="4" style={{ textAlign: "center", padding: "20px", color: "#6b7280" }}>No bookings found.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
