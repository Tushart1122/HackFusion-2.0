import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../components/login.css"
const LoginStudent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login credentials to the backend
      const response = await axios.post("http://localhost:5000/api/student.model/login", { email, password });
      alert("Login successful!");
      localStorage.setItem("token", response.data.token);
      // Redirect to the dashboard after successful login
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed: " + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <>

      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Student Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="2022bcs101@sggs.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button">Login</button>
          </form>
          <p className="register-text">
            Don't have an account? <a href="/register">Register</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginStudent;