// src/pages/ManageRides.js
import React, { useEffect, useState } from "react";
import { getRides, deleteRide as apiDeleteRide } from "../api";

export default function ManageRides() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    try {
      const data = await getRides();
      setRides(data);
    } catch (err) {
      alert("Failed to fetch rides: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteRide = async (id) => {
    if (window.confirm("Are you sure you want to delete this ride?")) {
      try {
        await apiDeleteRide(id);
        setRides((prev) => prev.filter((r) => r.id !== id));
      } catch (err) {
        alert("Failed to delete ride: " + err.message);
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Manage Rides</h2>
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading rides...</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#007bff", color: "white" }}>
              {["Source", "Destination", "Status", "Actions"].map(h => (
                <th key={h} style={{ padding: "12px" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rides.length > 0 ? rides.map(r => (
              <tr key={r.id} style={{ textAlign: "center", borderBottom: "1px solid #ddd" }}>
                <td>{r.source || "—"}</td>
                <td>{r.destination || "—"}</td>
                <td>{r.status}</td>
                <td>
                  <button
                    onClick={() => deleteRide(r.id)}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer"
                    }}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", padding: "15px" }}>
                  No rides available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
