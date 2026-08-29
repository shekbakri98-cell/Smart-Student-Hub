import React from 'react';

export default function AdminAnalytics() {
  const pts =;
  return (
    <div className="p-6 max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-lg space-y-4 font-mono shadow-2xl">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <h2 className="text-md text-blue-400 font-bold uppercase tracking-wider">System Oversight Matrix</h2>
        <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800/60 px-2 py-0.5 rounded animate-pulse">LIVE_STREAMING</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="bg-slate-950 p-4 rounded border border-slate-800 flex justify-between items-center">
          <span className="text-slate-400">Active Sockets:</span>
          <span className="text-emerald-400 font-bold text-sm">200 / 200</span>
        </div>
        <div className="bg-slate-950 p-4 rounded border border-slate-800 flex justify-between items-center">
          <span className="text-slate-400">Edge Latency:</span>
          <span className="text-blue-400 font-bold text-sm">42ms</span>
        </div>
      </div>
      <div className="bg-slate-950 p-4 border border-slate-800 rounded h-48 relative overflow-hidden">
        <p className="text-[10px] text-slate-500 mb-4 uppercase tracking-wider">WebSocket Latency Telemetry</p>
        <div className="w-full h-28 flex items-end">
          <svg className="w-full h-full" viewBox="0 0 900 100" preserveAspectRatio="none">
            <polyline fill="none" stroke="#3b82f6" strokeWidth="3" points={pts.map((v, i) => `${i * 100 + 20},${100 - v}`).join(' ')} />
          </svg>
        </div>
      </div>
    </div>
  );
}
