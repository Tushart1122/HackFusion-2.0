const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AdminSchema = require("../models/admin");

const router = express.Router();

// ✅ Admin Registration Route
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if all fields are provided
    if (!name || !email || !password || !role) {
      return res.status(400).json({ success: false, msg: "All fields are required" });
    }

    // Define the condition for allowed emails
    const allowedDomains = ["admin.com"];
    const emailDomain = email.split("@")[1];

    if (!allowedDomains.includes(emailDomain)) {
      return res.status(400).json({ success: false, msg: "Email not supported" });
    }

    // Check if admin already exists
    const existingAdmin = await AdminSchema.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ success: false, msg: "Admin already registered" });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new admin
    const admin = await AdminSchema.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ success: true, msg: "Admin registered successfully", admin });
  } catch (error) {
    console.error("Error registering admin:", error);
    res.status(500).json({ success: false, msg: "Server error" });
  }
});

// ✅ Admin Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if admin exists
    const admin = await AdminSchema.findOne({ email });
    if (!admin) {
      return res.status(400).json({ success: false, msg: "Admin not found!" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, msg: "Invalid credentials!" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin._id, role: admin.role }, "your_secret_key", { expiresIn: "1h" });

    res.json({ success: true, token, admin });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, msg: "Server error" });
  }
});

module.exports = router;
