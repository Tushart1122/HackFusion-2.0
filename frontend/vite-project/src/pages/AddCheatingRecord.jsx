import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCheatingRecord = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    studentName: "",
    examName: "",
    subject: "",
    reason: "",
    proof: "",
    status: "Pending", // Default status
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/cheating.model/add", formData);
      alert("Cheating record added successfully");
      navigate("/faculty/cheating-records"); // Redirect to records page
    } catch (error) {
      console.error("Error adding record:", error);
      alert("Failed to add record");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Report Cheating Incident</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Student Name:</label>
        <input type="text" name="studentName" value={formData.studentName} onChange={handleChange} className="w-full p-2 border rounded mb-4" required />

        <label className="block mb-2">Exam Name:</label>
        <input type="text" name="examName" value={formData.examName} onChange={handleChange} className="w-full p-2 border rounded mb-4" required />

        <label className="block mb-2">Subject:</label>
        <input type="text" name="subject" value={formData.subject} onChange={handleChange} className="w-full p-2 border rounded mb-4" required />

        <label className="block mb-2">Reason:</label>
        <textarea name="reason" value={formData.reason} onChange={handleChange} className="w-full p-2 border rounded mb-4" required></textarea>

        <label className="block mb-2">Proof (URL or description):</label>
        <input type="text" name="proof" value={formData.proof} onChange={handleChange} className="w-full p-2 border rounded mb-4" />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default AddCheatingRecord;
