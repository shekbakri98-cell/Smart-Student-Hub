const mongoose = require('mongoose');
module.exports = mongoose.model('Material', new mongoose.Schema({
    title: { type: String, required: true },
    subject: { type: String, required: true },
    fileUrl: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    year: Number
}, { timestamps: true }));
