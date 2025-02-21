import React, { useState } from "react";
import axios from "axios";
import "../components/complaint.css"; // Import CSS file

const Complaint = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    userId: "23",
    studentName: "",
    regNo: "",
    year: "",
    category: "",
    anonymous: false,
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const categories = [
    "Academic",
    "Harassment & Ragging",
    "Facility Issue",
    "Hostel",
    "Other",
  ]; // Added "Other" option

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/complaint/submit-complaint",
        formData
      );
      setMessage("Complaint submitted successfully!");
      setFormData({
        title: "",
        description: "",
        userId: "23",
        studentName: "",
        regNo: "",
        year: "",
        category: "",
        anonymous: false,
      });
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
      console.log(err);
    }
  };

  return (
    <div className="complaint-container">
      <h2 className="form-title">Submit a Complaint</h2>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="complaint-form">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>

        <label>Student Name</label>
        <input
          type="text"
          name="studentName"
          value={formData.studentName}
          onChange={handleChange}
          required
        />

        <label>Registration No.</label>
        <input
          type="text"
          name="regNo"
          value={formData.regNo}
          onChange={handleChange}
          required
        />

        <label>Year</label>
        <input
          type="text"
          name="year"
          value={formData.year}
          onChange={handleChange}
          required
        />

        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <label className="checkbox-label">
          <input
            type="checkbox"
            name="anonymous"
            checked={formData.anonymous}
            onChange={handleChange}
          />
          Submit Anonymously
        </label>

        <button type="submit">Submit Complaint</button>
      </form>
    </div>
  );
};

export default Complaint;
