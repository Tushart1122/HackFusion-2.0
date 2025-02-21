const mongoose = require("mongoose");

const LeaveSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    parentEmail: { type: String, required: false },
    parentNumber: { type: String, required: true },
    classCoordinatorEmail: { type: String, required: true },
    department: { type: String, required: true },
    year: { type: Number, required: true },
    reason: { type: String, required: true },
    leaveType: { 
      type: String, 
      enum: ["sick", "campus_leave"],
      required: true 
    },
    fromDate: { type: Date },
    toDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model("Leave", LeaveSchema);
