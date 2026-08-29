const { initializeApp, cert } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');
require('dotenv').config();

let bucket = null;
if (process.env.FIREBASE_PROJECT_ID) {
    try {
        initializeApp({
            credential: cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
            }),
            storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`
        });
        bucket = getStorage().bucket();
    } catch (e) { console.warn("⚠️ Firebase connection skipped or key format invalid."); }
}
module.exports = bucket;
