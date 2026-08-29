const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');
const { verifyToken, checkRole } = require('../middleware/auth');

router.post('/create', verifyToken, checkRole(['Teacher', 'Admin']), async (req, res) => {
    const ass = new Assignment({ ...req.body, createdBy: req.user.id });
    await ass.save();
    res.status(201).json({ message: "Assignment distributed" });
});
module.exports = router;
