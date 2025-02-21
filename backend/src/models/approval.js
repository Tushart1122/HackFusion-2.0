const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  applicationType: {
    type: String,
    enum: ["Event", "Budget", "Sponsorship"],
    required: true
  },
  details: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending"
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin"
  },
  priority: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model("Application", ApplicationSchema);
