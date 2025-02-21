const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    registrationNumber: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true, 
    },
    year:{
      type:String,
      requried:true,
    },
    contact_no :{
      type:Number,
      required:true,
    }
}, { timestamps: true }); 

module.exports = mongoose.model("Student", StudentSchema);

