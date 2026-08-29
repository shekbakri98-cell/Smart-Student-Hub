const mongoose = require('mongoose');
module.exports = mongoose.model('Mark', new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subject: String, evaluationType: String, scoreObtained: Number, maximumScore: Number,
    gradedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true }));
