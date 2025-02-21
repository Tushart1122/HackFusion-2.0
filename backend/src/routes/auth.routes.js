const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

// Dummy in-memory store for OTPs (use a persistent store in production)
const otpStore = {};

// Endpoint: Register a New User
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if email ends with "@sggs.ac.in"
    if (!email.endsWith("@sggs.ac.in")) {
      return res.status(400).json({ message: "Only college emails (@sggs.ac.in) are allowed." });
    }
    
    // Check if the user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Registration successful", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error during registration", error });
  }
});

// Endpoint: Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // Create a JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error during login", error });
  }
});

// Endpoint: Verify OTP
// For demonstration, we assume that an OTP is generated elsewhere and stored in otpStore using the email as key.
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    // Check if OTP exists in our dummy store
    if (!otpStore[email]) {
      return res.status(400).json({ message: "OTP not generated for this email." });
    }

    if (otpStore[email] === otp) {
      // OTP is valid; remove from store
      delete otpStore[email];
      res.status(200).json({ message: "OTP verified successfully." });
    } else {
      res.status(400).json({ message: "Invalid OTP." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error verifying OTP", error });
  }
});

// Endpoint: Reset Password
router.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    // Find the user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password", error });
  }
});

module.exports = router;
