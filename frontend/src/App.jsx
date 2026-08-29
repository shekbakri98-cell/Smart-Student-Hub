import React from 'react';
import AdminAnalytics from './pages/AdminAnalytics';
import AIAssistant from './components/AIAssistant';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 relative">
      <AdminAnalytics />
      <AIAssistant />
    </div>
  );
}
