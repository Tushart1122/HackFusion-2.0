import React, { useState } from "react";
import axios from "axios";

const StudentRegistration = () => {
    const API_URL = "http://localhost:5000/api/student.model/register"; // Update with your backend URL

    const [formData, setFormData] = useState({
        name: "",
        registrationNumber: "",
        email: "",
        password: "",
        department: "",
        year: "",
        contact_no: "",
    });

    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(API_URL, formData);
            setMessage(response.data.message);
            setSuccess(response.status === 201);
            if (response.status === 201) {
                setFormData({
                    name: "", registrationNumber: "", email: "", password: "", department: "", year: "", contact_no: ""
                });
            }
        } catch (error) {
            setMessage(error.response?.data?.message || "Server error");
            setSuccess(false);
        }
    };

    // Inline CSS styles
    const styles = {
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f4f4f4",
        },
        formBox: {
            background: "#fff",
            padding: "25px",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            width: "350px",
            textAlign: "center",
        },
        title: {
            fontSize: "24px",
            marginBottom: "15px",
            color: "#333",
        },
        input: {
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "14px",
        },
        button: {
            width: "100%",
            padding: "10px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            transition: "background 0.3s ease-in-out",
        },
        buttonHover: {
            backgroundColor: "#218838",
        },
        message: {
            marginTop: "10px",
            fontWeight: "bold",
        },
        success: {
            color: "green",
        },
        error: {
            color: "red",
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.formBox}>
                <h2 style={styles.title}>Student Registration</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} style={styles.input} required />
                    <input type="text" name="registrationNumber" placeholder="Registration Number" value={formData.registrationNumber} onChange={handleChange} style={styles.input} required />
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} style={styles.input} required />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} style={styles.input} required />
                    <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} style={styles.input} required />
                    <input type="text" name="year" placeholder="Year" value={formData.year} onChange={handleChange} style={styles.input} required />
                    <input type="text" name="contact_no" placeholder="Contact Number" value={formData.contact_no} onChange={handleChange} style={styles.input} required />
                    <button type="submit" style={styles.button}>Register</button>
                </form>
                {message && <p style={{ ...styles.message, ...(success ? styles.success : styles.error) }}>{message}</p>}
            </div>
        </div>
    );
};

export default StudentRegistration;
