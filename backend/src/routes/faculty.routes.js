const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Faculty = require("../models/faculty.model");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Faculty Registration Route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, department } = req.body;

    // Check if email ends with '@sggs.ac.in'
    if (!email.endsWith("@sggs.ac.in")) {
      return res.status(400).json({ message: "Email must end with '@sggs.ac.in'" });
    }

    // Check if faculty already exists
    const existingFaculty = await Faculty.findOne({ email });
    if (existingFaculty) {
      return res.status(400).json({ message: "Faculty already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new faculty using hashedPassword
    const newFaculty = new Faculty({
      name,
      email,
      password: hashedPassword, // corrected: using hashed password
      department
    });

    await newFaculty.save();
    res.status(201).json({ message: "Faculty registered successfully", faculty: newFaculty });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Faculty Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if faculty exists
    const faculty = await Faculty.findOne({ email });
    if (!faculty) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, faculty.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: faculty._id, role: "Teacher" }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get all faculties
router.get("/", async (req, res) => {
  try {
    const faculties = await Faculty.find();
    res.status(200).json(faculties);
  } catch (error) {
    res.status(500).json({ message: "Error fetching faculty data", error: error.message });
  }
});

// Get faculty by ID (protected)
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    res.status(200).json(faculty);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
