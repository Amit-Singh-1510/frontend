"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '@/config';

interface Booking {
    _id: string;
    status: string;
    price: number;
    load: {
        pickupLocation: string;
        dropLocation: string;
        materialType: string;
    };
    truck: {
        truckNumber: string;
    };
    shipper: {
        name: string;
        mobile: string;
    };
}

export default function Bookings() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${API_URL}/api/bookings`, {
                headers: { 'x-auth-token': token }
            });
            setBookings(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const updateStatus = async (id: string, status: string) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`${API_URL}/api/bookings/${id}/status`, { status }, {
                headers: { 'x-auth-token': token }
            });
            fetchBookings(); // Refresh
        } catch (err) {
            console.error(err);
            alert("Failed to update status");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Booking Requests</h1>

            {loading ? (
                <p>Loading bookings...</p>
            ) : bookings.length === 0 ? (
                <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-lg shadow">
                    <p className="text-gray-500">No booking requests found.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Load</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Truck</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Shipper</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {bookings.map((booking) => (
                                <tr key={booking._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                        {booking.load.pickupLocation} ➝ {booking.load.dropLocation}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {booking.truck.truckNumber}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {booking.shipper.name}<br/>
                                        <span className="text-xs">{booking.shipper.mobile}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                                        ₹{booking.price}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${booking.status === 'Requested' ? 'bg-yellow-100 text-yellow-800' : ''}
                                            ${booking.status === 'Accepted' ? 'bg-blue-100 text-blue-800' : ''}
                                            ${booking.status === 'Completed' ? 'bg-green-100 text-green-800' : ''}
                                            ${booking.status === 'Rejected' ? 'bg-red-100 text-red-800' : ''}
                                        `}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        {booking.status === 'Requested' && (
                                            <div className="flex space-x-2">
                                                <button 
                                                    onClick={() => updateStatus(booking._id, 'Accepted')}
                                                    className="text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md"
                                                >
                                                    Accept
                                                </button>
                                                <button 
                                                    onClick={() => updateStatus(booking._id, 'Rejected')}
                                                    className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )}
                                        {booking.status === 'Accepted' && (
                                            <button 
                                                onClick={() => updateStatus(booking._id, 'Delivered')}
                                                className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md"
                                            >
                                                Mark Delivered
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
