const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const bucket = require('../config/firebase');

router.get('/download/:filename', async (req, res) => {
    const filename = req.params.filename;
    const localPath = path.join(__dirname, '../public/local_fallback_storage', filename);
    try {
        if (bucket && (await bucket.file(`academic_assets/${filename}`).exists({ timeout: 2000 }))[0]) {
            return bucket.file(`academic_assets/${filename}`).createReadStream().pipe(res);
        }
        throw new Error();
    } catch (e) {
        if (fs.existsSync(localPath)) return res.sendFile(localPath);
        res.status(404).json({ message: "Asset not found." });
    }
});
module.exports = router;
