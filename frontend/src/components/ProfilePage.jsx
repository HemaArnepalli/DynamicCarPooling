import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../api";
import { getUserId, getUserRole } from "../utils/auth"; // Only get ID and role

export default function ProfilePage() {
  const navigate = useNavigate();
  const userId = getUserId(); // Exact _id from utils/auth
  const role = getUserRole();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch profile if userId exists
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(userId);
        setProfile(data);
      } catch (err) {
        console.error("❌ Error loading profile:", err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchProfile();
  }, [userId]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const stars = [];
    for (let i = 0; i < fullStars; i++)
      stars.push(<span key={i} className="text-yellow-500">★</span>);
    if (halfStar) stars.push(<span key="half" className="text-yellow-500">☆</span>);
    for (let i = stars.length; i < 5; i++)
      stars.push(<span key={"empty" + i} className="text-gray-300">★</span>);
    return stars;
  };

  if (loading) return <p className="text-center mt-8">Loading profile...</p>;
  if (error) return <p className="text-center text-red-600 mt-8">{error}</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-xl overflow-hidden">
      {/* Banner */}
      <div className="h-32 bg-gradient-to-r from-blue-400 to-blue-600 relative">
        <img
          src={profile?.profilePicture || "https://via.placeholder.com/100"}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-white absolute bottom-[-40px] left-1/2 transform -translate-x-1/2"
        />
      </div>

      <div className="p-6 mt-10">
        <h2 className="text-2xl font-bold text-center mb-2">{profile?.name}</h2>
        <p className="text-center text-gray-500 mb-6">{role?.toUpperCase()}</p>

        <div className="space-y-3 text-gray-700">
          <p><strong>Email:</strong> {profile?.email}</p>
          <p><strong>Contact:</strong> {profile?.contact || "-"}</p>

          {role === "driver" && (
            <p className="flex items-center">
              <strong>Rating:</strong>
              <span className="ml-2 flex">{renderStars(profile?.averageRating || 0)}</span>
              <span className="ml-2 text-sm text-gray-500">
                ({profile?.averageRating?.toFixed(1) || "0.0"})
              </span>
            </p>
          )}

          <p><strong>Joined On:</strong> {new Date(profile?.joinedAt).toLocaleDateString()}</p>
        </div>

        {/* Buttons */}
        <div className="mt-6 text-center flex justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Back
          </button>

          <button
            onClick={() => alert("Edit Profile coming soon!")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
