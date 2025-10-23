import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaSignInAlt } from "react-icons/fa";

export default function DriverPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      {/* Left Image Section */}
      <div
        style={{
          flex: 1,
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderTopRightRadius: "30px",
          borderBottomRightRadius: "30px",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.4)",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: "2rem",
            fontWeight: "bold",
            textAlign: "center",
            padding: "20px",
          }}
        >
          🚗 Drive & Share Your Ride
        </div>
      </div>

      {/* Right Content Section */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #ffe0b2, #ffccbc)",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            padding: "50px 40px",
            borderRadius: "20px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            textAlign: "center",
            maxWidth: "350px",
            width: "100%",
          }}
        >
          <h1 style={{ marginBottom: "40px", color: "#d84315" }}>
            Welcome, Driver
          </h1>

          {/* Register Button → navigates to DriverRegister */}
          <button
            onClick={() => navigate("/driver/register")}
            style={btn("#1976d2")}
          >
            <FaUserPlus style={{ marginRight: "10px" }} />
            Register
          </button>

          {/* Login Button → navigates to DriverLogin */}
          <button
            onClick={() => navigate("/driver/login")}
            style={btn("#43a047")}
          >
            <FaSignInAlt style={{ marginRight: "10px" }} />
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

// Button Styling
const btn = (bg) => ({
  width: "100%",
  margin: "10px 0",
  padding: "12px",
  borderRadius: "12px",
  border: "none",
  background: bg,
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
  fontSize: "16px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "all 0.3s",
});