// frontend/src/api.js
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "API Error");
  return data;
}

// ---------------- Ride APIs ----------------
export async function createRide(payload) {
  const res = await fetch(`${API_BASE}/rides`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function getRidesByDriver(driverId) {
  const res = await fetch(`${API_BASE}/rides/driver/${driverId}`);
  return handleResponse(res);
}

export async function getAllRides() {
  const res = await fetch(`${API_BASE}/rides`);
  return handleResponse(res);
}

export async function deleteRide(rideId) {
  const res = await fetch(`${API_BASE}/rides/${rideId}`, { method: "DELETE" });
  return handleResponse(res);
}

export async function updateRideStatus(rideId, status) {
  const res = await fetch(`${API_BASE}/rides/${rideId}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return handleResponse(res);
}

export async function getUserProfile(userId) {
  const res = await fetch(`${API_BASE}/users/profile/${userId}`);
  return handleResponse(res);
}

// ---------------- Booking APIs ----------------
export async function getBookings() {
  const res = await fetch(`${API_BASE}/admin/bookings`);
  return handleResponse(res);
}

export async function getBookingsByRide(rideId) {
  const res = await fetch(`${API_BASE}/bookings/ride/${rideId}`);
  return handleResponse(res);
}

export async function getBookingsByPassenger(passengerId) {
  const res = await fetch(`${API_BASE}/bookings/passenger/${passengerId}`);
  return handleResponse(res);
}

export async function createBooking(payload) {
  const res = await fetch(`${API_BASE}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function approveBooking(bookingId) {
  const res = await fetch(`${API_BASE}/bookings/approve/${bookingId}`, { method: "PUT" });
  return handleResponse(res);
}

export async function rejectBooking(bookingId) {
  const res = await fetch(`${API_BASE}/bookings/reject/${bookingId}`, { method: "PUT" });
  return handleResponse(res);
}

export async function makePayment(bookingId) {
  const res = await fetch(`${API_BASE}/bookings/payment/${bookingId}`, { method: "PUT" });
  return handleResponse(res);
}

// ---------------- Fare ----------------
export async function calculateFare(origin, destination, seats = 1) {
  const params = new URLSearchParams({ origin, destination, passengers: seats });
  const res = await fetch(`${API_BASE}/rides/calculate-fare?${params.toString()}`);
  return handleResponse(res);
}

// ---------------- Admin APIs ----------------
export async function adminLogin(email, password) {
  const res = await fetch(`${API_BASE}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(res);
}

export async function getAdminSummary() {
  const res = await fetch(`${API_BASE}/admin/reports/summary`);
  return handleResponse(res);
}

export async function getAllUsers() {
  const res = await fetch(`${API_BASE}/admin/users`);
  return handleResponse(res);
}
export async function getRides() {
  return getAllRides();
}
export async function calculateFareByName(origin, destination, passengers = 1) {
  const params = new URLSearchParams({ origin, destination, passengers });
  const res = await fetch(`${API_BASE}/rides/calculate-fare?${params.toString()}`);
  return handleResponse(res);
}

// ✅ Default export
export default {
  getRides,
  createRide,
  getRidesByDriver,
  getAllRides,
  deleteRide,
  updateRideStatus,
  getUserProfile,
  getBookings,
  getBookingsByRide,
  getBookingsByPassenger,
  createBooking,
  approveBooking,
  rejectBooking,
  makePayment,
  calculateFare,
  adminLogin,
  getAdminSummary,
  getAllUsers,
  calculateFareByName,
};
