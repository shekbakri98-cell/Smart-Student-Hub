const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function seed() {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smartstudenthub');
    await User.deleteMany({});
    const pass = await bcrypt.hash('HubPassword123!', 10);
    await User.insertMany([
        { name: "Root Admin", email: "admin@hub.edu", password: pass, role: "Admin" },
        { name: "Dr. Mehar", email: "teacher@hub.edu", password: pass, role: "Teacher" },
        { name: "Sai Thanusha", email: "student@hub.edu", password: pass, role: "Student" }
    ]);
    console.log("Database seeded successfully!");
    process.exit(0);
}
seed();
