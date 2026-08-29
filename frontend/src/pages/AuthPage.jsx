import React, { useState } from 'react';

export default function AuthPage({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL || 'https://smart-student-hub-frontend-h1cu.onrender.com';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !name)) {
      setErrorMsg('Please populate all mandatory fields.');
      return;
    }

    setErrorMsg('');
    setLoading(true);

    const targetUrl = isLogin ? `${API_BASE}/api/auth/login` : `${API_BASE}/api/auth/register`;
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
        if (onLoginSuccess) onLoginSuccess(data.token);
      } else {
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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#020617', padding: '16px', fontFamily: 'monospace', color: '#e2e8f0' }}>
      <div style={{ width: '100%', maxWidth: '384px', backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', padding: '24px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
        
        {/* Terminal Header Decoration */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', opacity: 0.6 }}>
          <span style={{ height: '8px', width: '8px', borderRadius: '50%', backgroundColor: '#ef4444', marginRight: '6px' }}></span>
          <span style={{ height: '8px', width: '8px', borderRadius: '50%', backgroundColor: '#f59e0b', marginRight: '6px' }}></span>
          <span style={{ height: '8px', width: '8px', borderRadius: '50%', backgroundColor: '#10b981', marginRight: '8px' }}></span>
          <span style={{ fontSize: '10px', tracking: '0.1em' }}>GATEWAY_AUTH</span>
        </div>

        <h2 style={{ fontSize: '20px', color: '#ffffff', textAlign: 'center', fontWeight: 'bold', margin: '0 0 4px 0', uppercase: 'true' }}>
          Smart Student Hub
        </h2>
        <p style={{ fontSize: '12px', textAlign: 'center', color: '#94a3b8', margin: '0 0 20px 0' }}>
          {isLogin ? "Sign In to Terminal Node" : "Register Account Profile"}
        </p>

        {errorMsg && (
          <div style={{ marginTop: '16px', backgroundColor: 'rgba(127, 29, 29, 0.4)', border: '1px solid #991b1b', color: '#f87171', padding: '10px', borderRadius: '4px', fontSize: '12px', wordBreak: 'break-words' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {!isLogin && (
            <div>
              <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '4px' }}>Full Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="Identity string..." 
                style={{ width: '100%', backgroundColor: '#020617', padding: '10px', borderRadius: '4px', border: '1px solid #1e293b', fontSize: '14px', color: '#ffffff', outline: 'none' }} 
              />
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '4px' }}>Email Endpoint</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@hub.edu" 
              style={{ width: '100%', backgroundColor: '#020617', padding: '10px', borderRadius: '4px', border: '1px solid #1e293b', fontSize: '14px', color: '#ffffff', outline: 'none' }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '4px' }}>Access Token Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              style={{ width: '100%', backgroundColor: '#020617', padding: '10px', borderRadius: '4px', border: '1px solid #1e293b', fontSize: '14px', color: '#ffffff', outline: 'none' }} 
            />
          </div>

          {!isLogin && (
            <div>
              <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '4px' }}>Institutional Role</label>
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)}
                style={{ width: '100%', backgroundColor: '#020617', padding: '10px', borderRadius: '4px', border: '1px solid #1e293b', fontSize: '14px', color: '#d1d5db', outline: 'none' }}
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
            style={{ width: '100%', backgroundColor: '#2563eb', color: '#ffffff', padding: '10px', borderRadius: '4px', fontSize: '12px', textTransform: 'uppercase', fontWeight: 'bold', border: 'none', cursor: 'pointer', opacity: loading ? 0.5 : 1, marginTop: '8px' }}
          >
            {loading ? "Transmitting..." : "Execute Sequence"}
          </button>
        </form>

        <button 
          type="button"
          onClick={() => { setIsLogin(!isLogin); setErrorMsg(''); }} 
          style={{ width: '100%', fontSize: '12px', textAlign: 'center', color: '#60a5fa', background: 'none', border: 'none', cursor: 'pointer', marginTop: '20px', textDecoration: 'underline' }}
        >
          {isLogin ? "[ Create Alternative Registry ]" : "[ Return to Active Terminal Sign In ]"}
        </button>
      </div>
    </div>
  );
}
