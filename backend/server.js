const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { Server } = require('socket.io');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); 
require('dotenv').config();

const app = express();
const server = http.createServer(app);

const ALLOWED_ORIGINS = [
    "https://onrender.com", 
    "http://localhost:5173"
];

const io = new Server(server, { 
    cors: { origin: ALLOWED_ORIGINS, methods: ["GET", "POST"], credentials: true } 
});

app.use(cors({ origin: ALLOWED_ORIGINS, methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }));
app.use(express.json());

// Points asset delivery to root workspace folder map structure
app.use('/public', express.static(path.join(__dirname, '..', 'public')));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/attendance', require('./routes/attendance'));
app.use('/api/materials', require('./routes/materials'));
app.use('/api/assignments', require('./routes/assignments'));
app.use('/api/marks', require('./routes/marks'));
app.use('/api/papers', require('./routes/papers'));
app.use('/api/bot', require('./routes/chatbot'));

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('✅ MongoDB Connected Successfully');
        try {
            const adminExists = await User.findOne({ email: "admin@hub.edu" });
            if (!adminExists) {
                console.log("⏳ Running baseline automated seeding procedure mapping vectors...");
                const pass = await bcrypt.hash('HubPassword123!', 10);
                await User.insertMany([
                    { name: "Root Admin", email: "admin@hub.edu", password: pass, role: "Admin" },
                    { name: "Dr. Mehar", email: "teacher@hub.edu", password: pass, role: "Teacher" },
                    { name: "Sai Thanusha", email: "student@hub.edu", password: pass, role: "Student" }
                ]);
                console.log("✅ Baseline records structured inside database framework.");
            } else {
                console.log("ℹ️ Identity records verified. Seed script processing skipped.");
            }
        } catch (seedErr) {
            console.error("⚠️ Automated seeding interception anomaly caught:", seedErr.message);
        }
    })
    .catch(err => console.error('❌ Database context mapping failure:', err));

io.on('connection', (socket) => {
    socket.on('join_room', (roomId) => socket.join(roomId));
    socket.on('send_message', (data) => io.to(data.room).emit('receive_message', data));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
