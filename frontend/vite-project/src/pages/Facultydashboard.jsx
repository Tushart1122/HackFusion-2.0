import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../components/FacultyDashboard.css"; // Import the CSS file

const FacultyDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : "collapsed"}`}>
        <h2 className="dashboard-title">Faculty Dashboard</h2>
        <button 
          className="toggle-btn" 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          ☰
        </button>
        <ul>
          <li>
            <NavLink to="/faculty/profile" activeClassName="active">
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/faculty/add-cheating-record" activeClassName="active">
              Add Cheating Record
            </NavLink>
          </li>
          <li>
            <NavLink to="/faculty/applications" activeClassName="active">
              Applications
            </NavLink>
          </li>
          <li>
            <NavLink to="/faculty/facility-booking" activeClassName="active">
              Facility Booking
            </NavLink>
          </li>
          <li>
            <NavLink to="/faculty/complaints" activeClassName="active">
              Check Complaints
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h2>Welcome, Faculty</h2>
        <p>Select an option from the menu.</p>
      </div>
    </div>
  );
};

export default FacultyDashboard;
