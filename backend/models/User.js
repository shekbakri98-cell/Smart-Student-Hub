const mongoose = require('mongoose');
module.exports = mongoose.model('User', new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Student', 'Teacher', 'Admin'], required: true },
    department: String, year: Number, rollNumber: String
}, { timestamps: true }));
