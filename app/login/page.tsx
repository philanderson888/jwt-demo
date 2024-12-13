'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { getUsers, createToken, addSessionLog, hashPassword } from '@/lib/auth';
import { Navigation } from '@/components/Navigation';

export default function Login() {
  const router = useRouter();
  const { setUser, setToken } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const users = getUsers();
    const passwordHash = await hashPassword(password);
    const user = users.find(u => u.username === username && u.passwordHash === passwordHash);
    
    console.log(`user login attempted with user ${username}, password ${password}, and password hash ${passwordHash}`);

    if (user) {
      const token = await createToken(user);

      console.log(`user ${username} logged in with token ${token}`);

      localStorage.setItem('token', token);

      console.log(`token stored in local storage`);
      
      setUser(user);
      setToken(token);
      addSessionLog('login', user.username, token, passwordHash);
      router.push('/');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      <div className="flex items-center justify-center px-4">
        <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-xl">
          <h1 className="text-2xl font-bold mb-8 text-center">Login</h1>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors"
            >
              Login
            </button>

            <p className="text-center text-sm">
              Don't have an account?{' '}
              <Link href="/register" className="text-blue-400 hover:text-blue-300">
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}