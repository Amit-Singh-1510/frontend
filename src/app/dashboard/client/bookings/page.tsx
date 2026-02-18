"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTruck, FaMapMarkerAlt, FaCalendarAlt, FaRupeeSign, FaCheckCircle, FaHourglassHalf, FaTimesCircle } from 'react-icons/fa';

export default function Bookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/bookings', {
        headers: { 'x-auth-token': token }
      });
      setBookings(res.data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
        case 'Requested': return <FaHourglassHalf className="text-orange-500" />;
        case 'Accepted': return <FaCheckCircle className="text-blue-500" />;
        case 'Delivered': return <FaCheckCircle className="text-green-500" />;
        case 'Rejected': return <FaTimesCircle className="text-red-500" />;
        default: return <FaHourglassHalf className="text-gray-500" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Active Bookings</h1>

      {loading ? (
          <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
      ) : bookings.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400">No active bookings found.</p>
          </div>
      ) : (
          <div className="space-y-4">
              {bookings.map((booking) => (
                  <div key={booking._id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                      <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-2">
                              {getStatusIcon(booking.status)}
                              <span className="font-bold text-gray-900 dark:text-white">{booking.status}</span>
                          </div>
                          <span className="text-sm text-gray-400">{new Date(booking.createdAt).toLocaleDateString()}</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                              <h3 className="text-sm font-semibold text-gray-500 mb-2">Load Details</h3>
                              <div className="flex items-center gap-2 mb-1">
                                  <FaMapMarkerAlt className="text-indigo-500"/>
                                  <span className="text-gray-800 dark:text-gray-200">{booking.load?.pickupLocation} → {booking.load?.dropLocation}</span>
                              </div>
                              <p className="text-sm text-gray-500 ml-6">{booking.load?.materialType}</p>
                          </div>
                          <div>
                              <h3 className="text-sm font-semibold text-gray-500 mb-2">Truck & Owner</h3>
                              <div className="flex items-center gap-2 mb-1">
                                  <FaTruck className="text-green-500"/>
                                  <span className="text-gray-800 dark:text-gray-200">{booking.truck?.truckNumber} ({booking.truck?.type})</span>
                              </div>
                              <p className="text-sm text-gray-500 ml-6">Owner: {booking.owner?.name} ({booking.owner?.mobile})</p>
                          </div>
                      </div>

                      <div className="mt-4 pt-4 border-t dark:border-gray-700 flex justify-end">
                             <p className="text-lg font-bold text-gray-900 dark:text-white">Target Price: ₹{booking.price}</p>
                      </div>
                  </div>
              ))}
          </div>
      )}
    </div>
  );
}
