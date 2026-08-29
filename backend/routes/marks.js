const express = require('express');
const router = express.Router();
const Mark = require('../models/Mark');
const { verifyToken, checkRole } = require('../middleware/auth');

router.post('/record-grade', verifyToken, checkRole(['Teacher', 'Admin']), async (req, res) => {
    const grade = new Mark({ ...req.body, gradedBy: req.user.id });
    await grade.save();
    res.status(201).json({ message: "Mark posted" });
});
module.exports = router;
