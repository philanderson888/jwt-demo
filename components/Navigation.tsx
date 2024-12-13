'use client';

import Link from 'next/link';
import { useAuth } from './AuthProvider';
import { Home, LogOut, Info, Lock } from 'lucide-react';

export function Navigation() {
  const { user, setUser, setToken } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  return (
    <nav className="bg-gray-800 p-4 mb-8">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
          >
            <Home size={20} />
            <span>Home</span>
          </Link>
          
          <Link 
            href="/about" 
            className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
          >
            <Info size={20} />
            <span>About</span>
          </Link>

          {user && (
            <Link 
              href="/secure" 
              className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
            >
              <Lock size={20} />
              <span>Secure</span>
            </Link>
          )}
        </div>
        
        {user ? (
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        ) : (
          <div className="flex items-center space-x-4">
            <Link 
              href="/login"
              className="text-white hover:text-gray-300 transition-colors"
            >
              Login
            </Link>
            <Link 
              href="/register"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}