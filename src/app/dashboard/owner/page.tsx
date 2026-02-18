"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '@/config';
import { FaTruck, FaBoxOpen, FaRupeeSign, FaExclamationCircle } from 'react-icons/fa';

export default function OwnerDashboard() {
  const [stats, setStats] = useState({
    activeTrucks: 0,
    availableLoads: 0,
    pendingBookings: 0,
    earnings: 0
  });

  useEffect(() => {
    // Ideally fetch stats from backend. For now, we simulate or fetch simple counts.
    const fetchStats = async () => {
        const token = localStorage.getItem('token');
        if(!token) return;

        try {
            // Parallel requests
            // In a real app, create a dedicated /stats endpoint
            const trucksRes = await axios.get(`${API_URL}/api/trucks`, { headers: { 'x-auth-token': token } });
            const bookingsRes = await axios.get(`${API_URL}/api/bookings`, { headers: { 'x-auth-token': token } });
            
            const activeTrucks = trucksRes.data.filter((t: any) => t.available).length;
            const pendingBookings = bookingsRes.data.filter((b: any) => b.status === 'Requested').length;
            // Calculate earnings from completed bookings
            const earnings = bookingsRes.data
                .filter((b: any) => b.status === 'Completed' || b.status === 'Delivered')
                .reduce((acc: number, curr: any) => acc + (curr.price || 0), 0);

            setStats({
                activeTrucks,
                availableLoads: 12, // Mock for now, or fetch loads count
                pendingBookings,
                earnings
            });
        } catch (err) {
            console.error(err);
        }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-indigo-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Available Trucks</p>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeTrucks}</h2>
            </div>
            <FaTruck className="h-8 w-8 text-indigo-500 opacity-50" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-green-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Loads Nearby</p>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.availableLoads}</h2>
            </div>
            <FaBoxOpen className="h-8 w-8 text-green-500 opacity-50" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Pending Requests</p>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pendingBookings}</h2>
            </div>
            <FaExclamationCircle className="h-8 w-8 text-yellow-500 opacity-50" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-purple-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Earnings</p>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">₹{stats.earnings}</h2>
            </div>
            <FaRupeeSign className="h-8 w-8 text-purple-500 opacity-50" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Recent Activity</h3>
            <p className="text-gray-500 dark:text-gray-400">No recent activity found.</p>
        </div>
         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Quick Actions</h3>
            <div className="space-y-4">
                <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">Add New Truck</button>
                <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">Find Loads</button>
            </div>
        </div>
      </div>
    </div>
  );
}
