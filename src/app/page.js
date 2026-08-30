'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSystemUsers() {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        
        if (!response.ok) throw new Error(data.error || "Failed execution pass.");
        setUsers(data.users);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchSystemUsers();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-8">
      <header className="border-b border-slate-800 pb-4 mb-6">
        <h1 className="font-mono text-sm font-bold tracking-widest text-white">XAMPP_MYSQL // NODE_SHELL</h1>
      </header>

      <main className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-lg p-6 shadow-2xl">
        <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4">Active Database Node Users</h3>

        {loading && <p className="text-xs font-mono text-blue-400 animate-pulse">Querying local relational tables...</p>}
        {error && <div className="bg-red-950/40 border border-red-900 text-red-400 font-mono text-xs p-3 rounded mb-4">{error}</div>}

        {!loading && users.length === 0 && !error && (
          <p className="text-xs font-mono text-slate-500">Database connected. Table is currently empty. Run a seed script inside phpMyAdmin!</p>
        )}

        <div className="space-y-2">
          {users.map((user) => (
            <div key={user.id} className="bg-slate-950 border border-slate-800 p-3 rounded font-mono text-xs flex justify-between items-center">
              <div>
                <span className="text-blue-400 font-bold">#{user.id}</span> — <span className="text-white">{user.name}</span>
                <span className="block text-[10px] text-slate-500 mt-0.5">{user.email}</span>
              </div>
              <span className="text-[10px] bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-slate-400 uppercase font-bold">{user.role}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
