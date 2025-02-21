const mongoose = require("mongoose");
const validator = require("validator");

const FacultySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    unique: true, 
    required: true,
    validate: {
      validator: (email) => {
        return validator.isEmail(email) && /^[A-Za-z].*@sggs\.ac\.in$/.test(email);
      },
      message: "Email must start with a letter and end with '@sggs.ac.in'."
    }
  },
  password: { 
    type: String, 
    required: true 
  },
  department: { 
    type: String, 
    required: true 
  },
}, { timestamps: true });

module.exports = mongoose.model("Faculty", FacultySchema);
