const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config(); // Loads Atlas credentials from environment settings

async function seed() {
    try {
        console.log("⏳ Initializing database connection for seeding profile deployment matrix...");
        
        // Connect directly to your live Atlas connection string variable configuration
        const connectionTarget = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smartstudenthub';
        await mongoose.connect(connectionTarget);
        console.log("✅ Secure connection established with the database cluster.");

        // Clear previous configurations to avoid duplicate key index errors
        await User.deleteMany({});
        console.log("🗑️ Stale identity documents purged from data collection layers.");

        const pass = await bcrypt.hash('HubPassword123!', 10);
        
        // Inject operational infrastructure identities
        await User.insertMany([
            { name: "Root Admin", email: "admin@hub.edu", password: pass, role: "Admin" },
            { name: "Dr. Mehar", email: "teacher@hub.edu", password: pass, role: "Teacher" },
            { name: "Sai Thanusha", email: "student@hub.edu", password: pass, role: "Student" }
        ]);

        console.log("✅ Database seeded successfully with baseline operational nodes!");
    } catch (error) {
        console.error("❌ Seeding architecture failed to execute:", error.message);
    } finally {
        // Safely shut down database operations cleanly
        await mongoose.disconnect();
        process.exit(0);
    }
}

seed();
