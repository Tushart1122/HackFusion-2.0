const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema({
    organizerType: {
        type: String,
        enum: ["Department", "Club", "College", "Other"], 
        required: true
    },
    organizerName: {
        type: String,
        required: true 
    },
    eventName: {
        type: String,
        required: true
    },
    allocatedAmount: {
        type: Number,
        required: true,
        default :0
    },
    spentAmount: {
        type: Number,
        default: 0
    },
    sponsorships: { 
      type: Number, 
      default: 0 
  },
    // proof: {
    //     type: [String], 
    //     default: []
    // },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    },
    
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin" 
  },
  remarks: {
      type: String, // Reviewer comments (optional)
      default: ""
  }
}, { timestamps: true });

module.exports = mongoose.model("Budget", BudgetSchema);