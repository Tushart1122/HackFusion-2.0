const Student = require('../models/Student');
const Leave = require('../models/Leave');
const Complaint = require('../models/Complaint');

// Student Profile
exports.getStudentProfile = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching student profile', error });
    }
};

// Apply for Leave
exports.applyForLeave = async (req, res) => {
    try {
        const { studentId, reason, fromDate, toDate } = req.body;
        const leave = new Leave({ studentId, reason, fromDate, toDate, status: 'Pending' });
        await leave.save();
        res.status(201).json({ message: 'Leave request submitted' });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting leave request', error });
    }
};

// File Anonymous Complaint
exports.fileComplaint = async (req, res) => {
    try {
        const { studentId, complaintText } = req.body;
        const complaint = new Complaint({ studentId, complaintText, status: 'Pending' });
        await complaint.save();
        res.status(201).json({ message: 'Complaint filed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error filing complaint', error });
    }
};
