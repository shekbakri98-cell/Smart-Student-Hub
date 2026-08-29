import React, { useState } from 'react';

export default function AIAssistant() {
    const [open, setOpen] = useState(false);
    return (
        <div className="fixed bottom-6 right-6 z-50">
            <button onClick={() => setOpen(!open)} className="bg-blue-600 p-4 rounded-full shadow-2xl text-xl hover:bg-blue-500 transition-all">
                🤖
            </button>
            {open && (
                <div className="absolute bottom-16 right-0 w-80 h-80 bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between shadow-2xl">
                    <div className="text-xs text-blue-400 font-bold border-b border-slate-800 pb-2">Academic Copilot AI Node</div>
                    <div className="flex-1 text-xs text-slate-400 py-4">Ask me anything about your institutional hub dashboard metrics setup configuration...</div>
                    <input placeholder="Type an academic query..." className="w-full bg-slate-950 p-2 text-xs rounded border border-slate-800 text-white focus:outline-none focus:border-blue-500" />
                </div>
            )}
        </div>
    );
}
