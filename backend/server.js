const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// Configure cross-origin restrictions cleanly for both HTTP and WebSockets
const ALLOWED_ORIGINS = [
    "https://smart-student-hub-frontend-h1cu.onrender.com", 
    "http://localhost:5173"
];

const io = new Server(server, { 
    cors: { 
        origin: ALLOWED_ORIGINS, 
        methods: ["GET", "POST"],
        credentials: true
    } 
});

// Enforce structured CORS mapping rules onto incoming HTTP API request pipelines
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

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

io.on('connection', (socket) => {
    socket.on('join_room', (roomId) => {
        socket.join(roomId);
    });
    
    socket.on('send_message', (data) => {
        // Corrected data.roomId to data.room to match your frontend Chat.jsx emit payload structure
        io.to(data.room).emit('receive_message', data);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
