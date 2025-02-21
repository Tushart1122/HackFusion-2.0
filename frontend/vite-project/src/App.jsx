import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Home Page
import Home from "./pages/Home.jsx";  

// Student Routes
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import StudentDashboard from "./pages/StudentDash.jsx";

// Admin Routes
import AdminLogin from "./pages/adminlogin.jsx";  
import AdminDashboard from "./pages/admin.jsx";  
import AdminRegister from "./pages/adminregister.jsx";  

// Faculty Routes
import FacultyRegister from "./pages/FacultyRegister.jsx";
import FacultyLogin from "./pages/FacultyLogin.jsx";
import FacultyDashboard from "./pages/Facultydashboard.jsx";
import AddCheatingRecord from "./pages/AddCheatingRecord.jsx";
import FacilityBooking from "./pages/FacilityBooking.jsx";
import CheckComplaints from "./pages/CheckComplaints.jsx";
import CheatingRecords from "./pages/CheatingRecords.jsx";

// Complaint & Other Functionalities
import Complaints from "./pages/Complaints.jsx";

// Future Features (commented for now)
// import BudgetApproval from "./pages/BudgetApproval.jsx";
// import SponsorshipTracking from "./pages/SponsorshipTracking.jsx";
// import LeaveApproval from "./pages/LeaveApproval.jsx";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          {/* 🔹 Home Page */}
          <Route path="/" element={<Home />} />  

          {/* 🔹 Student Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<StudentDashboard />} />

          {/* 🔹 Admin Routes */}
          <Route path="/admin-login" element={<AdminLogin />} />  
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-register" element={<AdminRegister />} />

          {/* 🔹 Faculty Routes */}
          <Route path="/faculty-register" element={<FacultyRegister />} />
          <Route path="/faculty-login" element={<FacultyLogin />} />
          <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
          <Route path="/faculty/facility-booking" element={<FacilityBooking />} />
          <Route path="/faculty/add-cheating-record" element={<AddCheatingRecord />} />
          <Route path="/faculty/cheating-records" element={<CheatingRecords />} />
          <Route path="/faculty/complaints" element={<CheckComplaints />} />

          {/* 🔹 Complaints */}
          <Route path="/complaints" element={<Complaints />} />

          {/* 🔹 Future Features (Uncomment when needed) */}
          {/* <Route path="/budget-approval" element={<BudgetApproval />} /> 
          <Route path="/sponsorship-tracking" element={<SponsorshipTracking />} />
          <Route path="/leave-approval" element={<LeaveApproval />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
