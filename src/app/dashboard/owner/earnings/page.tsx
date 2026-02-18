"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaMoneyCheckAlt, FaHistory, FaDownload, FaTruck } from 'react-icons/fa';


export default function Earnings() {
    const [stats, setStats] = useState({
        totalEarnings: 0,
        pendingPayment: 0,
        completedTrips: 0
    });

    const [trips, setTrips] = useState([]);

    useEffect(() => {
        // Fetch bookings and calculate earnings
        const fetchEarnings = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:5000/api/bookings', {
                    headers: { 'x-auth-token': token }
                });
                
                const bookings = res.data;
                const completed = bookings.filter((b: any) => b.status === 'Completed' || b.status === 'Delivered');
                
                const total = completed.reduce((acc: number, curr: any) => acc + (curr.price || 0), 0);
                const pending = completed.filter((b: any) => b.paymentStatus === 'Pending').reduce((acc: number, curr: any) => acc + (curr.price || 0), 0);

                setStats({
                    totalEarnings: total,
                    pendingPayment: pending,
                    completedTrips: completed.length
                });

                setTrips(completed);
            } catch (err) {
                console.error(err);
            }
        };
        fetchEarnings();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Earnings & Payments</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-t-4 border-green-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 dark:text-gray-400">Total Earnings</p>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">₹{stats.totalEarnings}</h2>
                        </div>
                        <FaMoneyCheckAlt className="text-green-500 text-4xl opacity-50" />
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-t-4 border-yellow-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 dark:text-gray-400">Pending Payments</p>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">₹{stats.pendingPayment}</h2>
                        </div>
                        <FaHistory className="text-yellow-500 text-4xl opacity-50" />
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-t-4 border-blue-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 dark:text-gray-400">Completed Trips</p>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{stats.completedTrips}</h2>
                        </div>
                        <FaTruck className="text-blue-500 text-4xl opacity-50" />
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Payment History</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Trip ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Invoice</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                         {trips.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">No completed trips yet.</td>
                            </tr>
                         ) : (
                             trips.map((trip: any) => (
                                <tr key={trip._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(trip.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">#{trip._id.slice(-6)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">₹{trip.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${trip.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {trip.paymentStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                                        <FaDownload />
                                    </td>
                                </tr>
                             ))
                         )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


