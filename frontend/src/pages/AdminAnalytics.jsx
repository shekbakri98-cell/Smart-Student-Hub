import React from 'react';

export default function AdminAnalytics() {
    // Array'n daataa duraan addaan citee ture asitti guutummaatti suphameera
    const pts =;

    return (
        <div className="p-6 text-slate-100 max-w-6xl mx-auto space-y-6 bg-slate-950 min-h-screen">
            <div className="border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-bold text-blue-400">System Oversight Matrix</h1>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <h6 className="text-xs text-slate-400 uppercase font-bold">Active Sockets</h6>
                    <h2 className="text-xl font-bold text-amber-400 mt-1">200</h2>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <h6 className="text-xs text-slate-400 uppercase font-bold">Edge Latency</h6>
                    <h2 className="text-xl font-bold text-emerald-400 mt-1">42ms</h2>
                </div>
            </div>
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <h3 className="text-sm font-bold text-slate-300 mb-4">WebSocket System Processing Latency</h3>
                <div className="w-full bg-[#0b0f19] border border-slate-800 rounded-lg p-4">
                    <svg viewBox="0 0 700 200" className="w-full h-40 overflow-visible">
                        <polyline 
                            fill="none" 
                            stroke="#3b82f6" 
                            strokeWidth="3.5" 
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            points={pts.map((v, i) => `${i * 100 + 40},${200 - v * 1.5}`).join(' ')} 
                        />
                        {pts.map((v, i) => (
                            <circle key={i} cx={i * 100 + 40} cy={200 - v * 1.5} r="5" className="fill-blue-400 stroke-slate-900 stroke-2" />
                        ))}
                    </svg>
                </div>
            </div>
        </div>
    );
}
