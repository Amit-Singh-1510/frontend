"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaTruck, FaBox, FaClipboardList, FaMoneyBillWave, FaUser, FaFileAlt, FaMapMarkerAlt } from 'react-icons/fa';

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard/owner', icon: FaTruck },
    { name: 'My Trucks', href: '/dashboard/owner/trucks', icon: FaTruck },
    { name: 'Find Loads', href: '/dashboard/owner/loads', icon: FaBox },
    { name: 'Bookings', href: '/dashboard/owner/bookings', icon: FaClipboardList },
    { name: 'Earnings', href: '/dashboard/owner/earnings', icon: FaMoneyBillWave },
    { name: 'Documents', href: '/dashboard/owner/documents', icon: FaFileAlt },
    { name: 'Profile', href: '/dashboard/owner/profile', icon: FaUser },
    { name: 'Live Tracking', href: '/dashboard/owner/tracking', icon: FaMapMarkerAlt },
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Owner Panel</h1>
        </div>
        <nav className="mt-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                pathname === item.href ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-r-4 border-indigo-600' : ''
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        {children}
      </div>
    </div>
  );
}
