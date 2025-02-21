const Faculty = require('../models/Faculty');
const Complaint = require('../models/Complaint');

// Faculty Dashboard
exports.getFacultyDashboard = async (req, res) => {
    try {
        const complaints = await Complaint.find({ status: 'Pending' });
        res.status(200).json({ complaints });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching faculty dashboard', error });
    }
};

// Approve Student Leave Request
exports.approveLeave = async (req, res) => {
    try {
        const leaveId = req.params.id;
        const leave = await Leave.findByIdAndUpdate(leaveId, { status: 'Approved' }, { new: true });
        res.status(200).json({ message: 'Leave approved', leave });
    } catch (error) {
        res.status(500).json({ message: 'Error approving leave', error });
    }
};

exports.recordAcademicIntegrity = async (req, res) => {
    try {
        const { studentId, description } = req.body;
        const complaint = new Complaint({ studentId, description, status: 'Pending' });
        await complaint.save();
        res.status(201).json({ message: 'Academic integrity issue recorded' });
    } catch (error) {
        res.status(500).json({ message: 'Error recording issue', error });
    }
};
