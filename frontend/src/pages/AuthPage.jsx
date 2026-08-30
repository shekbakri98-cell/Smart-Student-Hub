import React, { useState } from 'react';

export default function AuthPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSequenceExecution = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    // 💡 DYNAMIC NETWORK HOST OVERRIDE ARCHITECTURE
    const isProduction = window.location.hostname !== 'localhost';
    const BACKEND_URL = isProduction 
      ? 'https://smart-student-hub-backend-2upy.onrender.com' 
      : '';

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Authentication execution rejected.");
      }

      onLoginSuccess(data.token);
    } catch (err) {
      console.error("❌ Authentication terminal loop crash:", err);
      setErrorMessage(err.message === "Failed to fetch" ? "Network sequence execution error." : err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 font-sans text-slate-200">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-lg p-8 shadow-2xl relative">
        <div className="absolute top-4 left-4 flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500/60"></span>
          <span className="w-2 h-2 rounded-full bg-yellow-500/60"></span>
          <span className="w-2 h-2 rounded-full bg-green-500/60"></span>
        </div>
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-mono tracking-wide text-white font-bold">Smart Student Hub</h2>
          <p className="text-xs font-mono text-slate-500 mt-1">Sign In to Terminal Node</p>
        </div>

        {errorMessage && (
          <div className="mb-5 bg-red-950/40 border border-red-950 text-red-400 font-mono text-xs px-4 py-2.5 rounded text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLoginSequenceExecution} className="space-y-5">
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1.5">Email Endpoint</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@hub.edu"
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1.5">Access Token Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider rounded transition-all shadow-lg active:scale-[0.99] disabled:opacity-50"
          >
            {isLoading ? "PROCESSING SEQUENCE..." : "EXECUTE SEQUENCE"}
          </button>
        </form>
      </div>
    </div>
  );
}
