const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const { verifyToken, checkRole } = require('../middleware/auth');

router.post('/manual-log', verifyToken, checkRole(['Teacher', 'Admin']), async (req, res) => {
    try {
        const record = new Attendance({ ...req.body, markedBy: req.user.id });
        await record.save();
        res.status(201).json({ message: "Attendance data log saved" });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/wifi-ping', verifyToken, checkRole(['Student']), async (req, res) => {
    const { classroomBssid, subject } = req.body;
    if (!["00:1a:2b:3c:4d:5e", "00:1a:2b:3c:4d:6f"].includes(classroomBssid))
        return res.status(400).json({ message: "Invalid Wi-Fi AP signature framework." });
    const autoEntry = new Attendance({ studentId: req.user.id, subject, status: 'Present', markedBy: req.user.id });
    await autoEntry.save();
    res.status(201).json({ message: "Wi-Fi check-in terminal verified." });
});

module.exports = router;
