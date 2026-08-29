const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

router.post('/query', verifyToken, async (req, res) => {
    const { userPrompt } = req.body;
    if (process.env.GEMINI_API_KEY) {
        try {
            const { GoogleGenAI } = require('@google/genai');
            const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
            const resp = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: userPrompt });
            return res.json({ responseText: resp.text });
        } catch (e) { console.error(e); }
    }
    res.json({ responseText: `[Dev Fallback Model Mode] Prompt response echoed: "${userPrompt}"` });
});

module.exports = router;
