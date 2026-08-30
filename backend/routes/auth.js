const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role, department, year, rollNumber } = req.body;
        
        // Safety guard against duplicate registration attempts
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email address is already registered." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, role, department, year, rollNumber });
        await user.save();
        res.status(201).json({ message: "Registration successful" });
    } catch (e) { 
        console.error("❌ Registration Pipeline Failure:", e.message);
        res.status(500).json({ error: "Internal server processing anomaly." }); 
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // 1. Separate checks to avoid obscure conditional evaluations
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid login credentials." });
        }

        // 2. Safely evaluate user password matching sequence
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid login credentials." });
        }

        // 3. Fallback signature guarantee check
        const secretKey = process.env.JWT_SECRET || 'fallback_secure_token_secret_string';

        // 4. Generate JSON Web Token
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            secretKey, 
            { expiresIn: '60m' }
        );

        // 5. Send secure payload response packet back to frontend
        return res.status(200).json({ 
            token, 
            user: { id: user._id, name: user.name, role: user.role } 
        });

    } catch (e) { 
        // 💡 This logs the EXACT reason for the 500 error to your Render logs!
        console.error("❌ Login Pipeline Process Failure:", e.stack);
        return res.status(500).json({ error: e.message }); 
    }
});

module.exports = router;
