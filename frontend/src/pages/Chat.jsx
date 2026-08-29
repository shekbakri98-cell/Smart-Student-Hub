import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

// Automatically routes to your live backend domain or falls back to local environment
const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const socket = io.connect(BACKEND_URL, { transports: ['websocket'] });

export default function Chat({ roomId, username }) {
  const [msg, setMsg] = useState('');
  const [log, setLog] = useState([]);

  useEffect(() => {
    if (roomId) {
      socket.emit('join_room', roomId);
    }

    const handleIncomingMessage = (data) => {
      setLog((prev) => [...prev, data]);
    };

    socket.on('receive_message', handleIncomingMessage);

    return () => {
      socket.off('receive_message', handleIncomingMessage);
    };
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;

    const messageData = {
      roomId: roomId,
      author: username || 'Anonymous',
      message: msg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    socket.emit('send_message', messageData);
    setLog((prev) => [...prev, messageData]);
    setMsg('');
  };

  return (
    <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 shadow-xl max-w-xl mx-auto">
      <div className="space-y-2 h-48 overflow-y-auto mb-4 font-mono text-xs bg-slate-950/50 p-3 rounded border border-slate-850">
        {log.map((item, idx) => (
          <div key={idx} className="p-1 break-words">
            <span className="text-blue-400 font-bold">[{item.time}] {item.author}:</span> <span className="text-slate-200">{item.text || item.message}</span>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input 
          value={msg} 
          onChange={(e) => setMsg(e.target.value)} 
          placeholder="Enter intercom transmission..."
          className="flex-1 bg-slate-950 p-2.5 text-xs font-mono rounded border border-slate-800 text-slate-200 focus:outline-none focus:border-blue-500" 
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-xs font-mono text-white font-bold uppercase tracking-wider">
          Send
        </button>
      </form>
    </div>
  );
}
