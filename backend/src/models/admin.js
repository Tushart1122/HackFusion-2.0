const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
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
    role: {
        type: String,
        default: "Admin",
    },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },
}, { timestamps: true });  

module.exports = mongoose.model("Admin", AdminSchema);
