const express = require("express");
const Leave = require("../models/leave.model");
const nodemailer = require("nodemailer");
const router = express.Router();
require("dotenv").config();

// Setup nodemailer transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Helper function to send emails
const sendEmail = async (to, subject, text) => {
  const mailOptions = { from: process.env.EMAIL_USER, to, subject, text };
  return transporter.sendMail(mailOptions);
};

// POST /apply - Student applies for leave
router.post("/apply", async (req, res) => {
  try {
    const { name, email, parentEmail, parentNumber, classCoordinatorEmail, department, year, reason, leaveType } = req.body;

    if (!name || !email || !department || !year || !reason || !leaveType) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const newLeave = new Leave({
      name,
      email,
      parentEmail,
      parentNumber,
      classCoordinatorEmail,
      department,
      year,
      reason,
      leaveType
    });

    await newLeave.save();

    if (leaveType === "sick") {
      await sendEmail(
        classCoordinatorEmail,
        "Student Reported Sick",
        `The student ${name} (Email: ${email}) from ${department}, Year ${year}, reported being sick. Reason: ${reason}`
      );
    }

    if (leaveType === "campus_leave" && parentEmail) {
      await sendEmail(
        parentEmail,
        "Student Left Campus",
        `Your child ${name} (Email: ${email}) has left the college campus. Reason: ${reason}`
      );
    }

    res.status(201).json({ message: "Leave request submitted successfully" });
  } catch (error) {
    console.error("Error in leave apply route:", error);
    res.status(500).json({ message: "Server error", error: error.message || error });
  }
});

// GET all leave requests
router.get("/all", async (req, res) => {
  try {
    const leaves = await Leave.find();
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message || error });
  }
});

// GET leave request by ID
router.get("/:id", async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) return res.status(404).json({ message: "Leave request not found" });
    res.status(200).json(leave);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message || error });
  }
});

module.exports = router;
