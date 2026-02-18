"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '@/config';

interface Load {
    _id: string;
    pickupLocation: string;
    dropLocation: string;
    materialType: string;
    weight: string;
    price: number;
    truckTypeRequired: string;
    createdAt: string;
}

export default function FindLoads() {
    const [loads, setLoads] = useState<Load[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');

    const fetchLoads = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${API_URL}/api/loads?location=${filter}`, {
                headers: { 'x-auth-token': token }
            });
            setLoads(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLoads();
    }, []); // Initial load

    // Debounce search could be better, but simple button for now
    const handleSearch = () => {
        setLoading(true);
        fetchLoads();
    };

    const handleAcceptLoad = async (loadId: string) => {
        // In a real app, this should open a modal to select WHICH truck to assign.
        // For simplicity, we'll just alert the user to use the 'Bookings' tab or implement selection later.
        alert("To accept this load, please contact the business or use the booking request feature.");
        // Actually, the requirement says "Accept / Reject Booking Requests".
        // This implies the Business sends the request.
        // But "View Available Loads" implies the Owner can see loads and maybe express interest.
        // Let's assume Owner can "Request Booking" on a Load.
    };

    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Find Loads</h1>
                <div className="flex w-full md:w-auto gap-2">
                    <input 
                        type="text" 
                        placeholder="Search by location..." 
                        className="p-2 border rounded-md w-full md:w-64 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    <button 
                        onClick={handleSearch}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        Search
                    </button>
                </div>
            </div>

            {loading ? (
                <p>Loading loads...</p>
            ) : loads.length === 0 ? (
                <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-lg shadow">
                    <p className="text-gray-500">No available loads found nearby.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loads.map((load) => (
                        <div key={load._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                                        ₹{load.price}
                                    </div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(load.createdAt).toLocaleDateString()}</span>
                                </div>
                                
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{load.pickupLocation} ➝ {load.dropLocation}</h3>
                                
                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                        <span className="font-semibold w-24">Material:</span> {load.materialType}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                        <span className="font-semibold w-24">Weight:</span> {load.weight}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                        <span className="font-semibold w-24">Truck Type:</span> {load.truckTypeRequired}
                                    </div>
                                </div>

                                <button 
                                    onClick={() => handleAcceptLoad(load._id)}
                                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors font-medium"
                                >
                                    Request Load
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
