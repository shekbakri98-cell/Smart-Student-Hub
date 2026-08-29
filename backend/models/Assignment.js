const mongoose = require('mongoose');
module.exports = mongoose.model('Assignment', new mongoose.Schema({
    title: { type: String, required: true },
    description: String, subject: String, deadline: Date,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    submissions: [{
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        fileUrl: String, version: { type: Number, default: 1 }, submittedAt: { type: Date, default: Date.now }
    }]
}, { timestamps: true }));
