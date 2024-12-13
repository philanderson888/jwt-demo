'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { addSessionLog } from '@/lib/auth';
import { Navigation } from '@/components/Navigation';

const demoItems = [
  { id: 1, name: 'Confidential Report A', date: '2024-03-20' },
  { id: 2, name: 'Secret Project B', date: '2024-03-19' },
  { id: 3, name: 'Private Document C', date: '2024-03-18' },
];

export default function SecurePage() {
  const router = useRouter();
  const { user, token } = useAuth();

  useEffect(() => {
    if (!user || !token) {
      router.push('/login');
    } else {
      addSessionLog('accessed secure page', user.username);
    }
  }, [user, token, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Secure Content</h1>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Confidential Items</h2>
          <div className="space-y-4">
            {demoItems.map((item) => (
              <div 
                key={item.id}
                className="flex items-center justify-between p-4 bg-gray-700 rounded-lg"
              >
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-400">{item.date}</p>
                </div>
                <button 
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                  onClick={() => addSessionLog(`viewed ${item.name}`, user.username)}
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}