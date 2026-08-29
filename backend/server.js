const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { Server } = require('socket.io');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Import User model to handle auto-seed checks
require('dotenv').config();

const app = express();
const server = http.createServer(app);

const ALLOWED_ORIGINS = [
    "https://onrender.com", 
    "http://localhost:5173"
];

const io = new Server(server, { 
    cors: { 
        origin: ALLOWED_ORIGINS, 
        methods: ["GET", "POST"],
        credentials: true
    } 
});

app.use(cors({
    origin: ALLOWED_ORIGINS,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/attendance', require('./routes/attendance'));
app.use('/api/materials', require('./routes/materials'));
app.use('/api/assignments', require('./routes/assignments'));
app.use('/api/marks', require('./routes/marks'));
app.use('/api/papers', require('./routes/papers'));
app.use('/api/bot', require('./routes/chatbot'));

// Connect to Database and trigger the automated one-time baseline profile seed
mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('✅ MongoDB Connected');
        
        try {
            // Check if our baseline users exist so we don't clear data repeatedly on every single restart
            const adminExists = await User.findOne({ email: "admin@hub.edu" });
            
            if (!adminExists) {
                console.log("⏳ Admin node missing. Initializing automated baseline infrastructure seeding process...");
                const pass = await bcrypt.hash('HubPassword123!', 10);
                
                await User.insertMany([
                    { name: "Root Admin", email: "admin@hub.edu", password: pass, role: "Admin" },
                    { name: "Dr. Mehar", email: "teacher@hub.edu", password: pass, role: "Teacher" },
                    { name: "Sai Thanusha", email: "student@hub.edu", password: pass, role: "Student" }
                ]);
                console.log("✅ Cloud Database auto-seeded successfully with credentials mapping array!");
            } else {
                console.log("ℹ️ Baseline records verified inside MongoDB cloud. Skipping auto-seed sequence.");
            }
        } catch (seedErr) {
            console.error("⚠️ Background seed routine interception error:", seedErr.message);
        }
    })
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

io.on('connection', (socket) => {
    socket.on('join_room', (roomId) => socket.join(roomId));
    socket.on('send_message', (data) => io.to(data.room).emit('receive_message', data));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
