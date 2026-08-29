import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect('/');

export default function Chat({ roomId, username }) {
  const [msg, setMsg] = useState('');
  const [log, setLog] = useState([]);

  useEffect(() => {
    socket.emit('join_room', roomId);
    const handleMessage = (d) => setLog(p => [...p, d]);
    socket.on('receive_message', handleMessage);
    return () => socket.off('receive_message', handleMessage);
  }, [roomId]);

  const send = () => {
    socket.emit('send_message', { roomId, author: username, text: msg });
    setMsg('');
  };

  return (
    <div className="p-4 bg-slate-900 rounded border border-slate-800">
      <div className="space-y-2 h-48 overflow-y-auto mb-4 font-mono text-xs">
        {log.map((m,i)=><div key={i}>{m.author}: {m.text}</div>)}
      </div>
      <div className="flex gap-2">
        <input value={msg} onChange={e=>setMsg(e.target.value)} className="flex-1 bg-slate-950 p-2 text-sm rounded border border-slate-800" />
        <button onClick={send} className="bg-blue-600 px-4 rounded text-sm text-white font-mono">Send</button>
      </div>
    </div>
  );
}
