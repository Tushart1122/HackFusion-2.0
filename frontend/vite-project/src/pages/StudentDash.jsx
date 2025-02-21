import React, { useState, useEffect } from "react";
import axios from "axios";
import { Home, Calendar, ClipboardList, Wallet, Bell, LogOut, Menu, User, FileText, CheckSquare, Vote, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../components/studentdashboard.css";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [studentName, setStudentName] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/student/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          console.log((response.data.name)); // Dynamically set the student name
        } else {
          setStudentName("Student");
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
        setStudentName("Student");
      }
    };

    fetchStudentData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setSidebarOpen(false)}>✖</button>
        <nav>
          <ul>
            <li className="nav-item" onClick={() => navigate("/dashboard")}><Home size={20} /> Dashboard</li>
            <li className="nav-item" onClick={() => navigate("/profile")}><User size={20} /> Student Profile</li>
            <li className="nav-item" onClick={() => navigate("/cheating-record")}><FileText size={20} /> Cheating Record</li>
            <li className="nav-item" onClick={() => navigate("/complaints")}><ClipboardList size={20} /> Complaints</li>
            <li className="nav-item" onClick={() => navigate("/event-applications")}><Briefcase size={20} /> Event Applications</li>
            <li className="nav-item" onClick={() => navigate("/facility-booking")}><Calendar size={20} /> Facility Booking</li>
            <li className="nav-item" onClick={() => navigate("/elections")}><Vote size={20} /> Election Portal</li>
            <li className="nav-item" onClick={() => navigate("/leave-application")}><CheckSquare size={20} /> Leave Application</li>
            <li className="nav-item" onClick={() => navigate("/notifications")}><Bell size={20} /> Notifications</li>
            <li className="nav-item logout" onClick={handleLogout}><LogOut size={20} /> Logout</li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
          <Menu size={24} />
        </button>

        <h1 className="welcome-text">
          {studentName === null ? "Loading..." : `Welcome, ${studentName}!`}
        </h1>

        {/* Dashboard Cards */}
        <div className="dashboard-grid">
          <div className="card blue" onClick={() => navigate("/facility-booking")}>
            <h3>Facility Bookings</h3>
            <p>Manage your facility bookings</p>
          </div>
          <div className="card green" onClick={() => navigate("/elections")}>
            <h3>Elections</h3>
            <p>Participate in elections</p>
          </div>
          <div className="card red" onClick={() => navigate("/complaints")}>
            <h3>Complaints</h3>
            <p>File a new complaint</p>
          </div>
          <div className="card yellow" onClick={() => navigate("/budget-tracking")}>
            <h3>Budget Requests</h3>
            <p>Track your budget</p>
          </div>
          <div className="card purple" onClick={() => navigate("/leave-application")}>
            <h3>Leave Application</h3>
            <p>Apply for leave</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
