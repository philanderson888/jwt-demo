'use client';

import { useEffect, useState } from 'react';
import { Session, getSessions } from '@/lib/auth';

export function SessionLogs() {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    const updateSessions = () => {
      setSessions(getSessions());
    };

    updateSessions();
    window.addEventListener('storage', updateSessions);
    
    return () => {
      window.removeEventListener('storage', updateSessions);
    };
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Session Logs</h2>
      <div className="bg-white/5 rounded-lg p-4 space-y-2">
        {sessions.map((session, index) => (
          <div key={index} className="border-b border-gray-700 pb-2">
            <p className="text-sm text-gray-400">{new Date(session.timestamp).toLocaleString()}</p>
            <p className="font-medium">Action: {session.action}</p>
            <p>User: {session.user}</p>
            {session.token && (
              <p className="text-xs text-gray-500 truncate">Token: {session.token}</p>
            )}
            {session.passwordHash && (
              <p className="text-xs text-gray-500 truncate">Password Hash: {session.passwordHash}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}