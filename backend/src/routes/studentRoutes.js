const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/student.model");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Student Registration Route
router.post("/register", async (req, res) => {
    try {
        const { name, registrationNumber, email, password, department, year, contact_no } = req.body;

        // Check if email or registration number already exists
        const existingStudent = await Student.findOne({ $or: [{ email }, { registrationNumber }] });
        if (existingStudent) {
            return res.status(400).json({ message: "Student already registered with this email or registration number." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newStudent = new Student({
            name,
            registrationNumber,
            email,
            password: password,
            department,
            year,
            contact_no
        });

        await newStudent.save();
        res.status(201).json({ message: "Student registered successfully", student: newStudent });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Student Login Route
router.post("/login", async (req, res) => {
    try {
      console.log("Request Body:", req.body); // Debug: check incoming request
  
      const { email, password } = req.body;
      
      // Check if student exists
      const student = await Student.findOne({ email });
      if (!student) {
        return res.status(400).json({ message: "User not Found" });
      }
  
      const isMatch = password === student.password;
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      const token = jwt.sign({ id: student._id, role: "Student" }, process.env.JWT_SECRET, { expiresIn: "1h" });
      
      console.log("Login successful, token:", token); // Debug: token generated
      res.status(200).json({ message: "Login successful", token });
      
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error", error });
    }
  });
  


  router.get("/:id", authMiddleware, async (req, res) => {
    try {
      const student = await Student.findById(req.params.id);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.status(200).json(student);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });
  


router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { name, registrationNumber, email, department, year, contact_no } = req.body;
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            { name, registrationNumber, email, department, year, contact_no },
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({ message: "Student updated successfully", student: updatedStudent });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;