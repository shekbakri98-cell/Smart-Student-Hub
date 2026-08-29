import React, { useState, useEffect } from 'react';
import AuthPage from './pages/AuthPage';
import AdminAnalytics from './pages/AdminAnalytics';
import StudentGrades from './pages/StudentGrades';
import TeacherUpload from './pages/TeacherUpload';
import Chat from './pages/Chat';
import AIAssistant from './components/AIAssistant';

// Helper utility to safely parse JWT tokens on the client side
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('hub_token') || null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      const payload = parseJwt(token);
      // Validate expiration timestamp matrix
      if (payload && payload.exp * 1000 > Date.now()) {
        setUser({ id: payload.id, role: payload.role });
      } else {
        handleLogout();
      }
    }
  }, [token]);

  const handleLoginSuccess = (receivedToken) => {
    localStorage.setItem('hub_token', receivedToken);
    setToken(receivedToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('hub_token');
    setToken(null);
    setUser(null);
  };

  // 1. Intercept Router for Unauthenticated Sessions
  if (!token || !user) {
    return <AuthPage onLoginSuccess={handleLoginSuccess} />;
  }

  // 2. Gateway Verification Switch
  const renderRoleDashboard = () => {
    switch (user.role) {
      case 'Admin':
        return <AdminAnalytics />;
      case 'Teacher':
        return <TeacherUpload />;
      case 'Student':
        return <StudentGrades />;
      default:
        return (
          <div className="p-8 text-center text-red-400 font-mono">
            ⚠️ Security Exception: Access Token missing authorized role registry.
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 relative font-sans text-slate-200">
      {/* Shell Master Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
          <span className="font-mono text-sm font-bold tracking-wider text-white">SMART_STUDENT_HUB // SECURITY_MESH</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs bg-slate-950 border border-slate-800 px-2.5 py-1 rounded font-mono text-slate-400">
            Node: <strong className="text-blue-400 font-normal">{user.role.toUpperCase()}</strong>
          </span>
          <button 
            onClick={handleLogout} 
            className="text-xs font-mono text-red-400 hover:text-red-300 border border-red-900/40 hover:border-red-500 bg-red-950/20 px-3 py-1 rounded transition-all"
          >
            DISCONNECT
          </button>
        </div>
      </header>

      {/* Dynamic Main Workspace Container View */}
      <main className="py-6">
        {renderRoleDashboard()}
      </main>

      {/* Embedded Persistent Comms Panel */}
      <div className="max-w-4xl mx-auto px-6 pb-24">
        <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Active Terminal Intercom</h3>
        <Chat roomId="class-101" username={`User_${user.id ? user.id.slice(-4) : 'Node'}`} />
      </div>

      {/* Floating System-Wide Copilot Overlay */}
      <AIAssistant />
    </div>
  );
}
