const express = require('express');
const router = express.Router();
const Paper = require('../models/Paper');
const { verifyToken } = require('../middleware/auth');

router.get('/archive-index', verifyToken, async (req, res) => {
    const resources = await Paper.find().sort({ academicYear: -1 });
    res.json(resources);
});
module.exports = router;
