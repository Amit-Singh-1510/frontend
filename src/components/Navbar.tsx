"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaTruck, FaMoon, FaSun, FaUser } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Check for user token on load
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Check system preference or saved preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setDarkMode(true);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => router.push('/')}>
            <FaTruck className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">Doctor Transport</span>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">Home</Link>
            <a href="#services" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">Services</a>
            <a href="#booking" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">Booking</a>
            <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">Contact</a>
            
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
            </button>

            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 font-medium">
                  <FaUser className="bg-indigo-100 p-1 rounded-full h-8 w-8 text-indigo-600" />
                  <span>{user.name || 'User'}</span>
                </button>
                <div className="absolute right-0 w-48 bg-white dark:bg-gray-800 shadow-xl rounded-md py-2 hidden group-hover:block border border-gray-100 dark:border-gray-700">
                  <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Logout</button>
                </div>
              </div>
            ) : (
              <div className="space-x-4">
                <Link href="/login" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 font-medium">Login</Link>
                <Link href="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium transition-colors">Register</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
