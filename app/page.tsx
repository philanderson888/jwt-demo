'use client';

import { useAuth } from '@/components/AuthProvider';
import { SessionLogs } from '@/components/SessionLogs';
import { Navigation } from '@/components/Navigation';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Shield size={64} className="text-blue-500" />
          </div>
          <h1 className="text-4xl font-bold mb-4">JWT Authentication Demo</h1>
          <p className="text-xl text-gray-400">
            A simple demonstration of JWT-based authentication and session logging
          </p>
        </div>
        
        <div className="space-y-8">
          {user ? (
            <>
              <div className="bg-gray-800 rounded-lg p-6 text-center">
                <p className="text-xl mb-4">Welcome back, {user.username}! 👋</p>
                <Link 
                  href="/secure" 
                  className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md transition-colors"
                >
                  View Secure Content
                </Link>
              </div>
            </>
          ) : (
            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-semibold mb-6">Get Started</h2>
              <div className="flex justify-center space-x-4">
                <Link 
                  href="/login" 
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md transition-colors"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-md transition-colors"
                >
                  Register
                </Link>
              </div>
            </div>
          )}

          <SessionLogs />
        </div>
      </div>
    </div>
  );
}