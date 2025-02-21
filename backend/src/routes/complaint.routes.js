const express = require('express');
const router = express.Router();
const Complaint = require('../models/complaint').default; 

router.post('/submit-complaint', async (req, res) => {
  try {
    const { title, description, category } = req.body;
    
    if (title.toLowerCase().includes("urgent")) {
      console.log("Urgent complaint received!");
    }

    if (category === "Harassment & Ragging") {
      console.log("This is a high-priority complaint.");
    }
    
    if (!title || !description || !category) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const complaintData = req.body;
    const newComplaint = new Complaint(complaintData);

    // Save the complaint
    const savedComplaint = await newComplaint.save();

    // Send response
    res.status(201).json(savedComplaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    
    const complaints = await Complaint.find();
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate('userId reviewedBy');
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedComplaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.status(200).json(updatedComplaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
  
    const deletedComplaint = await Complaint.findByIdAndDelete(req.params.id);
    if (!deletedComplaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.status(200).json({ message: 'Complaint deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
