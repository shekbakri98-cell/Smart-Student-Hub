const mongoose = require('mongoose');
module.exports = mongoose.model('Paper', new mongoose.Schema({
    subject: String, academicYear: Number, semesterType: String, fileUrl: String,
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true }));
