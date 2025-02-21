const express = require("express");
const router = express.Router();
const CheatingRecord = require("../models/cheating.model");

// ✅ Public cheating records
router.get("/public", async (req, res) => {
  try {
    const publicRecords = await CheatingRecord.find({
      public_visibility: true,
      status: "Verified",
    })
      .select("reason proof student reportedBy examName subject dateOfIncident status")
      .populate("student", "name")
      .populate("reportedBy", "name");

    res.status(200).json(publicRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Create new cheating record
router.post("/add", async (req, res) => {
  try {
    const { studentName, examName, subject, reason, proof, status } = req.body;

    // console.log(req.body);

    if (!studentName || !examName || !subject || !reason || !status ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newRecord = new CheatingRecord({
      student : studentName,
      regNo : "",
      examName,
      subject,
      reason,
      proof,
      reportedBy : "",
      dateOfIncident: "",
      status: "Pending",
      public_visibility: false,
    });

    // const savedRecord = await newRecord.save();
    await newRecord.save();
    
    res.status(201).json({ message: "Cheating record added successfully", data: newRecord });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Get all records
router.get("/", async (req, res) => {
  try {
    const records = await CheatingRecord.find().populate("student", "name").populate("reportedBy", "name");
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Get a specific record
router.get("/:id", async (req, res) => {
  try {
    const record = await CheatingRecord.findById(req.params.id)
      .populate("student", "name")
      .populate("reportedBy", "name");

    if (!record) {
      return res.status(404).json({ message: "Cheating record not found" });
    }
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Update cheating record
router.put("/:id", async (req, res) => {
  try {
    const updatedRecord = await CheatingRecord.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedRecord) {
      return res.status(404).json({ message: "Cheating record not found" });
    }
    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Delete a cheating record
router.delete("/:id", async (req, res) => {
  try {
    const deletedRecord = await CheatingRecord.findByIdAndDelete(req.params.id);
    if (!deletedRecord) {
      return res.status(404).json({ message: "Cheating record not found" });
    }
    res.status(200).json({ message: "Cheating record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
