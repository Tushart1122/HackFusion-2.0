import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/admindashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Check if admin is logged in
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin-login"); // Redirect to admin login if not logged in
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // Remove token on logout
    navigate("/admin-login"); // Redirect to admin login
  };

  return (
    <div className="admin-dashboard-container">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <button className="close-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? "✖" : "☰"}
        </button>
        {sidebarOpen && (
          <ul>
            <li onClick={() => navigate("/register")}>Register Student</li>
            <li onClick={() => navigate("/faculty-register")}>Register Faculty</li>
            <li onClick={() => navigate("/users")}>Manage Users</li>
            <li onClick={() => navigate("/approve-event")}>Approve Events</li>
            <li onClick={() => navigate("/complaints")}>Handle Complaints</li>
            <li onClick={() => navigate("/budget")}>Manage Budget</li>
          </ul>
        )}
      </div>

      {/* Main Content */}
      <div className="admin-dashboard-content">
        <nav className="admin-navbar">
          <h1>Admin Dashboard</h1>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </nav>

        <div className="dashboard-sections">
          <h2>Welcome, Admin</h2>
          <p>Manage users, register students & faculty, approve events, and more.</p>

          <div className="dashboard-grid">
            <div className="dashboard-card blue" onClick={() => navigate("/register")}>
              <h3>Register Student</h3>
              <p>Add new students to the system.</p>
            </div>

            <div className="dashboard-card green" onClick={() => navigate("/faculty-register")}>
              <h3>Register Faculty</h3>
              <p>Add new faculty members to the system.</p>
            </div>

            <div className="dashboard-card yellow" onClick={() => navigate("/users")}>
              <h3>Manage Users</h3>
              <p>View and manage registered users.</p>
            </div>

            <div className="dashboard-card red" onClick={() => navigate("/approve-event")}>
              <h3>Approve Events</h3>
              <p>Review and approve event applications.</p>
            </div>

            <div className="dashboard-card purple" onClick={() => navigate("/complaints")}>
              <h3>Handle Complaints</h3>
              <p>Review complaints and take necessary actions.</p>
            </div>

            <div className="dashboard-card cyan" onClick={() => navigate("/budget")}>
              <h3>Manage Budget</h3>
              <p>Track financial records and manage sponsorships.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
