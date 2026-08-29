const mongoose = require('mongoose');
module.exports = mongoose.model('Attendance', new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: String, required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['Present', 'Absent', 'Late'], required: true },
    markedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true }));
