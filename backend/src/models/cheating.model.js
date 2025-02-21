const mongoose = require("mongoose");

const CheatingRecordSchema = new mongoose.Schema({
    student: {
        type: String,
        required: true
    },
    regNo:{
        type:String,
        required:true,
        unique:true
    },
    examName: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    proof: {
       type: String, // URL of proof (image/pdf)
       required: true
   },
    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty",  
        required: true
    },
    dateOfIncident: {
        type: Date,
        required: true
    },
    public_visibilty:{
      type:Boolean,
      default:true
    },
}, { timestamps: true });

module.exports = mongoose.model("CheatingRecord", CheatingRecordSchema);

