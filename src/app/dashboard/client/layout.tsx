"use client";
import ClientLayout from './layout';
import SideNav from './SideNav';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`flex min-h-screen bg-gray-50 dark:bg-gray-900 ${inter.className}`}>
      {/* Sidebar */}
      <SideNav />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header (Mobile) */}
        <header className="bg-white dark:bg-gray-800 shadow-sm z-10 p-4 flex justify-between items-center md:hidden">
            <span className="font-bold text-lg dark:text-white">Neemrana Logistics</span>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}
