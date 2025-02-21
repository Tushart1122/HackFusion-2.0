const mongoose = require("mongoose");

const FacilityBookingSchema = new mongoose.Schema({
    facilityName: {
        type: String,
        required: true,
        enum: ["TennisCourt", "Auditorium", "LibraryHall", "SeminarRoom", "SportsGround"]
    },
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    bookingDate: {
        type: Date,
        required: true
    },
    startTime: {
        type: String, 
        required: true
    },
    endTime: {
        type: String, 
        required: true
    },
    approvalStatus: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    },
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin", 
        required :true
    },
    isAvailable: {
        type: Boolean,
        default: true 
    }
}, { timestamps: true });

FacilityBookingSchema.pre("save", async function (next) {
    const existingBooking = await mongoose.model("FacilityBooking").findOne({
        facilityName: this.facilityName,
        bookingDate: this.bookingDate,
        $or: [
            { startTime: { $lt: this.endTime }, endTime: { $gt: this.startTime } }
        ]
    });

    if (existingBooking) {
        this.isAvailable = false;
        return next(new Error("Facility already booked for the selected time slot."));
    }
    next();
});

module.exports = mongoose.model("FacilityBooking", FacilityBookingSchema);
