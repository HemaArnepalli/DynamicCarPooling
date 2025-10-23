// import React, { useEffect, useState } from "react";
// import { NavLink, Outlet, useNavigate } from "react-router-dom";

// export default function PassengerClub() {
//   const navigate = useNavigate();
//   const [passenger, setPassenger] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const API_BASE = import.meta.env.VITE_API_URL;

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     console.log("📦 Checking localStorage for user:", storedUser);

//     if (!storedUser) {
//       console.warn("⚠️ No user found, redirecting...");
//       navigate("/passenger/login", { replace: true });
//       return;
//     }

//     let userData;
//     try {
//       userData = JSON.parse(storedUser);
//       console.log("✅ Parsed User:", userData);
//     } catch (err) {
//       console.error("❌ Failed to parse stored user:", err);
//       localStorage.removeItem("user");
//       navigate("/passenger/login", { replace: true });
//       return;
//     }

//     const fetchPassengerProfile = async (id) => {
//       try {
//         const res = await fetch(`${API_BASE}/users/profile/${id}`);
//         const data = await res.json();

//         if (!res.ok) throw new Error(data.message || "Unauthorized");
//         console.log("✅ Passenger verified:", data);
//         setPassenger(data);
//       } catch (err) {
//         console.error("❌ Error verifying passenger:", err);
//         localStorage.removeItem("user");
//         navigate("/passenger/login", { replace: true });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPassengerProfile(userData.id || userData._id);
//   }, [navigate, API_BASE]);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/passenger/login");
//   };

//   if (loading) {
//     return (
//       <div style={{ textAlign: "center", marginTop: "100px" }}>
//         ⏳ Loading Passenger Dashboard...
//       </div>
//     );
//   }

//   if (!passenger) {
//     return (
//       <div style={{ textAlign: "center", marginTop: "100px" }}>
//         ⚠️ Unauthorized Access. Please log in.
//       </div>
//     );
//   }

//   return (
//     <div style={layout}>
//       <aside style={sidebar}>
//         <h2 style={logo}>🚖 Passenger</h2>
//         <div style={{ textAlign: "center", marginBottom: "20px" }}>
//           <p style={{ fontSize: "18px", color: "#ecf0f1", fontWeight: "600" }}>
//             Welcome, <b>{passenger.name}</b>
//           </p>
//         </div>

//         <nav style={nav}>
//           <NavLink to="dashboard" style={link}>📖 Dashboard</NavLink>
//           <NavLink to="search" style={link}>🔍 Search Rides</NavLink>
//           <NavLink to="book" style={link}>🚌 Book Ride</NavLink>
//           <NavLink to="profile" style={link}>👤 Profile</NavLink>
//         </nav>

//        // Inside your PassengerClub component
// const handleLogout = () => {
//   localStorage.removeItem("user");          // Clear logged-in user
//   navigate("/", { replace: true });         // Redirect to home page
// };

// // In your JSX (sidebar section)
// <button onClick={handleLogout} style={logoutBtn}>
//   🚪 Logout
// </button>


//       </aside>

//       <main style={content}>
//         <h1>Passenger Dashboard</h1>
//         <Outlet context={{ passenger }} /> 
//       </main>
//     </div>
//   );
// }

// /* ✅ Define all your styles here */
// const layout = {
//   display: "flex",
//   minHeight: "100vh",
//   fontFamily: "Poppins, sans-serif",
//   backgroundColor: "#f4f6f8",
// };

// const sidebar = {
//   width: "250px",
//   backgroundColor: "#2c3e50",
//   color: "#ecf0f1",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "space-between",
//   padding: "20px",
// };

// const logo = {
//   textAlign: "center",
//   fontSize: "24px",
//   fontWeight: "bold",
//   marginBottom: "30px",
// };

// const nav = {
//   display: "flex",
//   flexDirection: "column",
//   gap: "15px",
// };

// const link = {
//   color: "#ecf0f1",
//   textDecoration: "none",
//   fontSize: "16px",
//   padding: "10px 15px",
//   borderRadius: "8px",
//   transition: "background 0.3s",
// };

// const logoutBtn = {
//   backgroundColor: "#e74c3c",
//   border: "none",
//   color: "#fff",
//   padding: "10px 15px",
//   borderRadius: "8px",
//   cursor: "pointer",
//   fontWeight: "bold",
//   marginTop: "auto",
// };

// const content = {
//   flex: 1,
//   padding: "30px",
// };
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function PassengerClub() {
  const navigate = useNavigate();
  const [passenger, setPassenger] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_BASE = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("📦 Checking localStorage for user:", storedUser);

    if (!storedUser) {
      console.warn("⚠️ No user found, redirecting...");
      navigate("/passenger/login", { replace: true });
      return;
    }

    let userData;
    try {
      userData = JSON.parse(storedUser);
      console.log("✅ Parsed User:", userData);
    } catch (err) {
      console.error("❌ Failed to parse stored user:", err);
      localStorage.removeItem("user");
      navigate("/passenger/login", { replace: true });
      return;
    }

    const fetchPassengerProfile = async (id) => {
      try {
        const res = await fetch(`${API_BASE}/users/profile/${id}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Unauthorized");
        console.log("✅ Passenger verified:", data);
        setPassenger(data);
      } catch (err) {
        console.error("❌ Error verifying passenger:", err);
        localStorage.removeItem("user");
        navigate("/passenger/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchPassengerProfile(userData.id || userData._id);
  }, [navigate, API_BASE]);

  // ✅ Correct handleLogout
  const handleLogout = () => {
    localStorage.removeItem("user");   // Clear logged-in user
    navigate("/", { replace: true });  // Redirect to home page
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        ⏳ Loading Passenger Dashboard...
      </div>
    );
  }

  if (!passenger) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        ⚠️ Unauthorized Access. Please log in.
      </div>
    );
  }

  return (
    <div style={layout}>
      <aside style={sidebar}>
        <h2 style={logo}>🚖 Passenger</h2>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <p style={{ fontSize: "18px", color: "#ecf0f1", fontWeight: "600" }}>
            Welcome, <b>{passenger.name}</b>
          </p>
        </div>

        <nav style={nav}>
          <NavLink to="dashboard" style={link}>📖 Dashboard</NavLink>
          <NavLink to="search" style={link}>🔍 Search Rides</NavLink>
          {/* <NavLink to="book" style={link}>🚌 Book Ride</NavLink> */}
          <NavLink to="search" style={link}>🚌 Book Ride</NavLink>
          <NavLink to="profile" style={link}>👤 Profile</NavLink>
        </nav>

        {/* Logout Button */}
        <button onClick={handleLogout} style={logoutBtn}>
          🚪 Logout
        </button>
      </aside>

      <main style={content}>
        <h1>Passenger Dashboard</h1>
        <Outlet context={{ passenger }} /> 
      </main>
    </div>
  );
}

/* ✅ Styles */
const layout = {
  display: "flex",
  minHeight: "100vh",
  fontFamily: "Poppins, sans-serif",
  backgroundColor: "#f4f6f8",
};

const sidebar = {
  width: "250px",
  backgroundColor: "#2c3e50",
  color: "#ecf0f1",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "20px",
};

const logo = {
  textAlign: "center",
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "30px",
};

const nav = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const link = {
  color: "#ecf0f1",
  textDecoration: "none",
  fontSize: "16px",
  padding: "10px 15px",
  borderRadius: "8px",
  transition: "background 0.3s",
};

const logoutBtn = {
  backgroundColor: "#e74c3c",
  border: "none",
  color: "#fff",
  padding: "10px 15px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  marginTop: "auto",
};

const content = {
  flex: 1,
  padding: "30px",
};
