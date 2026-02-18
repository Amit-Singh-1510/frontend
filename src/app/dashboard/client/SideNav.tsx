"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaPlusCircle, FaList, FaTruck, FaFileInvoiceDollar, FaUserCircle, FaHistory, FaSignOutAlt } from 'react-icons/fa';

const navItems = [
  { name: 'Overview', href: '/dashboard/client', icon: FaHome },
  { name: 'Post Load', href: '/dashboard/client/post-load', icon: FaPlusCircle },
  { name: 'My Loads', href: '/dashboard/client/loads', icon: FaList },
  { name: 'Find Trucks', href: '/dashboard/client/trucks', icon: FaTruck },
  { name: 'Bookings', href: '/dashboard/client/bookings', icon: FaFileInvoiceDollar }, 
  { name: 'Payments', href: '/dashboard/client/payments', icon: FaFileInvoiceDollar },
  { name: 'History', href: '/dashboard/client/history', icon: FaHistory },
  { name: 'Profile', href: '/dashboard/client/profile', icon: FaUserCircle },
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 h-screen sticky top-0">
      <div className="flex items-center justify-center h-16 border-b dark:border-gray-700">
        <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">Neemrana Logistics</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 font-medium' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t dark:border-gray-700">
        <Link href="/login" className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors w-full">
            <FaSignOutAlt className="mr-3 h-5 w-5" />
            Sign Out
        </Link>
      </div>
    </aside>
  );
}
