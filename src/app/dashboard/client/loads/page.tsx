"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '@/config';
import { FaBox, FaMapMarkerAlt, FaCalendarAlt, FaTruck, FaClock } from 'react-icons/fa';

export default function MyLoads() {
  const [loads, setLoads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLoads();
  }, []);

  const fetchLoads = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      // Assuming GET /api/loads/my returns loads posted by the user
      const res = await axios.get(`${API_URL}/api/loads/my`, {
        headers: { 'x-auth-token': token }
      });
      setLoads(res.data);
    } catch (err) {
      console.error('Error fetching loads:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'Open': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
          case 'Assigned': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
          case 'InTransit': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300';
          case 'Delivered': return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
          default: return 'bg-gray-100 text-gray-700';
      }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Posted Loads</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage and track your active shipments</p>
        </div>
      </div>

        {loading ? (
            <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        ) : loads.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                <FaBox className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">No loads posted yet</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Start by posting your first shipment requirement</p>
                <a href="/dashboard/client/post-load" className="inline-flex items-center px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors">
                    Post New Load
                </a>
            </div>
        ) : (
            <div className="space-y-4">
                {loads.map((load) => (
                    <div key={load._id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div className="flex-1 space-y-3">
                                <div className="flex items-center justify-between md:justify-start gap-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${getStatusColor(load.status)}`}>
                                        {load.status}
                                    </span>
                                    <span className="text-sm text-gray-500 flex items-center"><FaCalendarAlt className="mr-1"/> {new Date(load.createdAt).toLocaleDateString()}</span>
                                </div>
                                
                                <div className="flex items-center gap-4 text-gray-900 dark:text-white text-lg font-semibold">
                                    <div className="flex items-center">
                                        <FaMapMarkerAlt className="text-indigo-500 mr-2"/>
                                        {load.pickupLocation}
                                    </div>
                                    <span className="text-gray-400">→</span>
                                    <div className="flex items-center">
                                        <FaMapMarkerAlt className="text-red-500 mr-2"/>
                                        {load.dropLocation}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                                    <span className="flex items-center bg-gray-50 dark:bg-gray-700 px-3 py-1 rounded"><FaBox className="mr-2"/> {load.materialType} ({load.weight})</span>
                                    <span className="flex items-center bg-gray-50 dark:bg-gray-700 px-3 py-1 rounded"><FaTruck className="mr-2"/> {load.truckTypeRequired}</span>
                                </div>
                            </div>

                            <div className="flex flex-col items-end justify-between min-w-[150px]">
                                <div className="text-right">
                                    <p className="text-xs text-gray-500 uppercase font-semibold">Offer Price</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">₹{load.price}</p>
                                </div>
                                <div className="flex gap-2 mt-4 w-full md:w-auto">
                                    <button className="flex-1 md:flex-none px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  );
}
