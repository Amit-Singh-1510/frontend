"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FaTruck, FaBox, FaMapMarkerAlt, FaUsers, FaRupeeSign } from 'react-icons/fa';

export default function ClientDashboard() {
  const [stats, setStats] = useState({
    activeLoads: 0,
    availableTrucks: 0,
    pendingBookings: 0,
    totalSpent: 0
  });

  useEffect(() => {
    // Mock data for now, replace with API calls later
    setStats({
      activeLoads: 5,
      availableTrucks: 12,
      pendingBookings: 2,
      totalSpent: 45000
    });
  }, []);

  const statCards = [
    { title: 'Active Loads', value: stats.activeLoads, icon: FaBox, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/20' },
    { title: 'Trucks Nearby', value: stats.availableTrucks, icon: FaTruck, color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/20' },
    { title: 'Pending Req', value: stats.pendingBookings, icon: FaUsers, color: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-900/20' },
    { title: 'Total Spent', value: `₹${stats.totalSpent}`, icon: FaRupeeSign, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/20' },
  ];

  const router = useRouter();

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Business Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage your shipments and track deliveries</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                <p className={`text-2xl font-bold mt-1 ${stat.color} dark:text-white`}>{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => router.push('/dashboard/client/post-load')}
                  className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-indigo-700 dark:text-indigo-300 font-medium hover:bg-indigo-100 transition-colors flex flex-col items-center justify-center gap-2"
                >
                    <FaPlusCircle className="h-6 w-6"/>
                    Post New Load
                </button>
                <button 
                   onClick={() => router.push('/dashboard/client/trucks')}
                   className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-700 dark:text-green-300 font-medium hover:bg-green-100 transition-colors flex flex-col items-center justify-center gap-2"
                >
                    <FaTruck className="h-6 w-6"/>
                    Find Trucks
                </button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
             <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
             <div className="space-y-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No recent activity</p>
             </div>
          </div>
      </div>
    </div>
  );
}

import { FaPlusCircle } from 'react-icons/fa';
