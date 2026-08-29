import React, { useState } from 'react';

export default function AuthPage({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !name)) {
      setErrorMsg('Please populate all mandatory fields.');
      return;
    }

    setErrorMsg('');
    setLoading(false);
    setLoading(true);

    const targetUrl = isLogin ? '/api/auth/login' : '/api/auth/register';
    const payload = isLogin ? { email, password } : { name, email, password, role };

    try {
      const response = await fetch(targetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Network sequence execution error.');
      }

      if (isLogin) {
        // Pass the structural token back up to App.jsx master node
        onLoginSuccess(data.token);
      } else {
        // Toggle view port back to sign-in terminal upon successful registration
        setIsLogin(true);
        setErrorMsg('Registration successful. Access authorization cleared.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed connecting to database cluster.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 font-sans text-slate-200">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-lg p-6 shadow-2xl">
        {/* Terminal Header Decoration */}
        <div className="flex items-center gap-1.5 mb-6 opacity-60">
          <span className="h-2 w-2 rounded-full bg-red-500"></span>
          <span className="h-2 w-2 rounded-full bg-amber-500"></span>
          <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
          <span className="text-[10px] font-mono ml-2 tracking-widest text-slate-400">GATEWAY_AUTH</span>
        </div>

        <h2 className="text-xl font-mono text-white text-center font-bold tracking-tight uppercase">
          Smart Student Hub
        </h2>
        <p className="text-xs text-center text-slate-400 mt-1 font-mono">
          {isLogin ? "Sign In to Terminal Node" : "Register Account Profile"}
        </p>

        {errorMsg && (
          <div className="mt-4 bg-red-950/40 border border-red-800 text-red-400 p-2.5 rounded text-xs font-mono break-words">
            {errorMsg}
          </div>
        )}

        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">Full Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="Identity string..." 
                className="w-full bg-slate-950 p-2.5 rounded border border-slate-800 text-sm focus:outline-none focus:border-blue-500 font-mono text-slate-100" 
              />
            </div>
          )}

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">Email Endpoint</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@hub.edu" 
              className="w-full bg-slate-950 p-2.5 rounded border border-slate-800 text-sm focus:outline-none focus:border-blue-500 font-mono text-slate-100" 
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">Access Token Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              className="w-full bg-slate-950 p-2.5 rounded border border-slate-800 text-sm focus:outline-none focus:border-blue-500 font-mono text-slate-100" 
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">Institutional Role</label>
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-slate-950 p-2.5 rounded border border-slate-800 text-sm focus:outline-none focus:border-blue-500 font-mono text-slate-300"
              >
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white p-2.5 rounded text-xs font-mono uppercase tracking-widest font-bold mt-2 shadow-md transition-all active:scale-[0.98]"
          >
            {loading ? "Transmitting..." : "Execute Sequence"}
          </button>
        </form>

        <button 
          onClick={() => { setIsLogin(!isLogin); setErrorMsg(''); }} 
          className="w-full text-xs text-center text-blue-400 hover:underline mt-5 font-mono"
        >
          {isLogin ? "[ Create Alternative Registry ]" : "[ Return to Active Terminal Sign In ]"}
        </button>
      </div>
    </div>
  );
}
