import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import Home from "./components/Home";
import "./index.css";
import DriverPage from "./components/DriverPage";
import DriverRegister from "./components/DriverRegister";
import DriverLogin from "./components/DriverLogin";
import DriverDashboard from "./components/DriverDashboard";
import  ProfilePage from "./components/ProfilePage";

import PassengerRegister from "./components/PassengerRegister";
import PassengerLogin from "./components/PassengerLogin"; // you’ll add next
import PassengerPage from "./components/PassengerPage";
import PassengerClub from "./components/PassengerClub";
import SearchRides from "./components/SearchRides";
import BookRide from "./components/BookRide";
import PassengerDashboard from "./components/PassengerDashboard";

import AdminLogin from  "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import ManageBookings from "./components/ManageBookings";
import ManageRides from "./components/ManageRides";
function App() {
  return (
   

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
       
       <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/bookings" element={<ManageBookings />} />
        <Route path="/admin/rides" element={<ManageRides />} />
       <Route path="/driver" element={<DriverPage />} />
        <Route path="/driver/register" element={<DriverRegister />} />
        <Route path="/driver/login" element={<DriverLogin />} />
         <Route path="/driver/dashboard" element={<DriverDashboard />} />
         <Route path="/driver/profilePage" element={<ProfilePage />} />

         <Route path="/passenger" element={<PassengerPage />} />
        <Route path="/passenger/register" element={<PassengerRegister />} />
         <Route path="/passenger/login" element={<PassengerLogin />} />
        
         <Route path="/passenger/passengerclub" element={<PassengerClub />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<PassengerDashboard />} />
          <Route path="search" element={<SearchRides />} />
          <Route path="book/:rideId" element={<BookRide />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>



      </Routes>
    </Router>
  );
}

export default App;
