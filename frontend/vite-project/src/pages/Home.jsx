import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import sggsBg from "../assets/SggsLogo.jpg";
import "../components/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Header Section */}
      <header className="header">
        <div className="logo">
          <img src={logo} alt="College Logo" />
        </div>
        <section className="Automated">
        <div className="Automated-content">
          <h1 id="auto" style={{ color: "black", fontSize: "2.5rem", fontWeight: "bold", textAlign: "center", position: "absolute", top: "20px", left: "50%", transform: "translateX(-50%)" }}>Automated Paperless Transparent College System</h1>
          
        </div>
      </section>
        <nav>
          <ul>
            <li><span onClick={() => navigate("/")}>Home</span></li>
            <li><span onClick={() => navigate("/login")}> Student</span></li>
            <li><span onClick={() => navigate("/faculty-login")}>Faculty</span></li>
            <li><span onClick={() => navigate("/admin-login")}>Admin</span></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Shri Guru Gobind Singhji Institute of Engineering & Technology</h1>
          <p>- Excellence in Education</p>
        </div>
      </section>
      <section id="image">
        <img src="\src\assets\SggsLogo.jpg" alt="xyz" />
      </section>
      {/* Main Content */}
      <section className="main-content">
        <div className="about">
          <h2 id="about">About the College</h2>
          <p id="para">
            Established in 1981, Shri Guru Gobind Singhji Institute of Engineering and Technology (SGGSIET),
            Nanded, is a leading institution in technical education, research, and technology transfer. The
            institute focuses on student-centric learning and academic excellence with a clean, green 46-acre campus
            funded entirely by the Government of Maharashtra. Collaborations with premier institutes and industries
            offer internships, credit transfers, and industry-relevant projects.
          </p>
        </div>
        <div className="map-section">
          <h2 id="map">How to Reach?</h2>
          <iframe
            className="map"
            src="https://maps.google.com/maps?q=SGGSIET%20Nanded&t=&z=13&ie=UTF8&iwloc=&output=embed"
            title="SGGSIET Location"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Our Vision Section */}
      <section id="Ourvision">
        <h3>Our Vision</h3>
        <p>"Turning tasks into clicks—making work seamless, digital, and paperless."</p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Shri Guru Gobind Singhji Institute of Engineering & Technology. All rights reserved.</p>
        <div className="social-icons">
          <a href="#">Facebook</a> |
          <a href="#">Twitter</a> |
          <a href="#">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
