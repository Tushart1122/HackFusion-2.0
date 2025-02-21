const Admin = require('../models/admin');
// const User = require('../models/User');
// const Event = require('../models/Event');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


// Admin Dashboard
exports.getDashboard = async (req, res) => {
    try {
        const users = await User.countDocuments();
        const events = await Event.countDocuments();
        res.status(200).json({ users, events });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching dashboard data', error });
    }
};

// Approve Event
exports.approveEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await Event.findByIdAndUpdate(eventId, { status: 'Approved' }, { new: true });
        res.status(200).json({ message: 'Event approved', event });
    } catch (error) {
        res.status(500).json({ message: 'Error approving event', error });
    }
};

// Manage Users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};
