const express = require("express");
const router = express.Router();
const mongoose = require("mongoose"); 
const FacilityBooking = require("../models/facility-booking");

// Create a new facility booking
router.post("/book", async (req, res) => {
    try {
        const { facilityName, bookedBy, purpose, bookingDate, startTime, endTime, approvedBy } = req.body;

        // Validate required fields
        if (!facilityName || !bookedBy || !purpose || !bookingDate || !startTime || !endTime) {
            return res.status(400).json({ message: "All fields are required!" });
        }

         if (!mongoose.Types.ObjectId.isValid(bookedBy)) {
            return res.status(400).json({ message: "Invalid bookedBy ID format!" });
        }
        if (approvedBy && !mongoose.Types.ObjectId.isValid(approvedBy)) {
          return res.status(400).json({ message: "Invalid approvedBy ID format!" });
      }
        // Create a new booking
        const newBooking = new FacilityBooking({
            facilityName,
            bookedBy:bookedBy,
            purpose,
            bookingDate,
            startTime,
            endTime,
            approvalStatus: "Pending",
            approvedBy
        });

        await newBooking.save();
        res.status(201).json({ message: "Booking request submitted!", newBooking });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Approve or Reject a booking (Admin only)
router.put("/:id/approve", async (req, res) => {
    try {
        const { status, approvedBy } = req.body;

        // Ensure status is either Approved or Rejected
        if (!["Approved", "Rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid approval status!" });
        }

        // Update booking status
        const booking = await FacilityBooking.findByIdAndUpdate(
            req.params.id,
            { approvalStatus: status, approvedBy },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({ message: "Booking not found!" });
        }

        res.status(200).json({ message: `Booking ${status.toLowerCase()} successfully!`, booking });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//  Get all bookings
router.get("/", async (req, res) => {
    try {
        const bookings = await FacilityBooking.find().populate("bookedBy approvedBy");
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//  Check facility availability
router.get("/availability/:facilityName/:date", async (req, res) => {
    try {
        const { facilityName, date } = req.params;

        const existingBooking = await FacilityBooking.findOne({
            facilityName,
            bookingDate: new Date(date),
            approvalStatus: "Approved"
        });

        if (existingBooking) {
            return res.status(200).json({ isAvailable: false, message: "Facility is booked on this date." });
        }

        res.status(200).json({ isAvailable: true, message: "Facility is available." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
