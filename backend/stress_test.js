const { io } = require('socket.io-client');
for (let i = 1; i <= 200; i++) {
    const socket = io('http://localhost:5000', { transports: ['websocket'] });
    socket.on('connect', () => {
        socket.emit('join_room', 'class-101');
        if(i === 200) console.log("🚀 Stressed 200 pipeline concurrent sockets successfully.");
    });
}
