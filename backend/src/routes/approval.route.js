const express = require("express");
const router = express.Router();
const Application = require("../models/application");

// POST: Submit a new application
router.post("/", async (req, res) => {
  try {
    const { applicant, applicationType, details } = req.body;
    if (!applicant || !applicationType || !details) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const newApplication = new Application(req.body);
    await newApplication.save();
    res.status(201).json({ message: "Application submitted successfully", application: newApplication });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET: Retrieve all applications
router.get("/", async (req, res) => {
  try {
    const applications = await Application.find().populate("applicant reviewedBy");
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET: Retrieve an application by ID
router.get("/:id", async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate("applicant reviewedBy");
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// PUT: Update an application (e.g., status, reviewedBy, priority)
router.put("/:id", async (req, res) => {
  try {
    const updatedApplication = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json({ message: "Application updated successfully", application: updatedApplication });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
