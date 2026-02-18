"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '@/config';
import { FaTruck, FaMapMarkerAlt, FaStar, FaPhone, FaSearch } from 'react-icons/fa';

export default function FindTrucks() {
  const [trucks, setTrucks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: '',
    type: 'Any'
  });
  const [selectedTruck, setSelectedTruck] = useState<any>(null);
  const [userLoads, setUserLoads] = useState<any[]>([]);
  const [loadingLoads, setLoadingLoads] = useState(false);

  const fetchUserLoads = async () => {
      setLoadingLoads(true);
      try {
          const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/api/loads/my?status=Open`, {
             headers: { 'x-auth-token': token }
          });
          setUserLoads(res.data);
      } catch (err) {
          console.error("Error fetching loads", err);
      } finally {
          setLoadingLoads(false);
      }
  };

  const openBookingModal = (truck: any) => {
      setSelectedTruck(truck);
      fetchUserLoads();
  };

  const handleBooking = async (loadId: string) => {
      if (!selectedTruck) return;
      try {
          const token = localStorage.getItem('token');
          await axios.post(`${API_URL}/api/bookings`, {
              loadId,
              truckId: selectedTruck._id,
              ownerId: selectedTruck.owner._id
          }, {
              headers: { 'x-auth-token': token }
          });
          alert('Booking Request Sent!');
          setSelectedTruck(null);
      } catch (err: any) {
          alert(err.response?.data?.msg || 'Booking failed');
      }
  };

  const fetchTrucks = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams(filters as any).toString();
      const res = await axios.get(`${API_URL}/api/trucks/search?${query}`);
      setTrucks(res.data);
    } catch (err) {
      console.error('Error fetching trucks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrucks();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTrucks();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Find Available Trucks</h1>
            <p className="text-gray-500 dark:text-gray-400">Search for reliable trucks near your pickup location</p>
        </div>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
            <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Enter City or Area" 
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white text-gray-900"
                    value={filters.location}
                    onChange={(e) => setFilters({...filters, location: e.target.value})}
                />
            </div>
        </div>
        <div className="w-full md:w-64">
             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Truck Type</label>
             <select 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white text-gray-900"
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
             >
                <option value="Any">Any Type</option>
                <option value="Mini">Mini Truck</option>
                <option value="14ft">14ft Container</option>
                <option value="Trailer">Trailer</option>
                <option value="Container">Large Container</option>
             </select>
        </div>
        <button type="submit" className="w-full md:w-auto px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center">
            <FaSearch className="mr-2" />
            Search
        </button>
      </form>

      {/* Truck List */}
      {loading ? (
        <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : trucks.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
            <FaTruck className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">No trucks found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trucks.map((truck) => (
                <div key={truck._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{truck.truckNumber}</h3>
                                <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400 px-2 py-1 bg-indigo-50 dark:bg-indigo-900/20 rounded mt-1 inline-block">
                                    {truck.type}
                                </div>
                            </div>
                            <div className="flex items-center text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded">
                                <FaStar className="mr-1 h-3 w-3" />
                                <span className="text-sm font-bold">{truck.owner?.rating || 'New'}</span>
                            </div>
                        </div>

                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-6">
                            <div className="flex items-center">
                                <FaMapMarkerAlt className="mr-2 text-gray-400" />
                                <span>{truck.location || 'Unknown Location'}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-semibold mr-2">Capacity:</span>
                                <span>{truck.capacity || 'N/A'}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-semibold mr-2">Routes:</span>
                                <span className="truncate">{truck.routes.join(', ') || 'Any'}</span>
                            </div>
                        </div>

                        <button 
                            onClick={() => openBookingModal(truck)}
                            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center"
                        >
                            Request Booking
                        </button>
                    </div>
                </div>
            ))}
        </div>
      )}
      {/* Booking Modal */}
      {selectedTruck && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Select Load</h3>
                <p className="mb-4 text-gray-500 dark:text-gray-400">Choose a load to assign to Truck {selectedTruck.truckNumber}</p>
                
                {loadingLoads ? (
                    <div className="text-center py-4">Loading your loads...</div>
                ) : userLoads.length === 0 ? (
                    <div className="text-center py-4">
                        <p className="text-red-500 mb-2">You have no open loads.</p>
                        <a href="/dashboard/client/post-load" className="text-indigo-600 underline">Post a Load</a>
                    </div>
                ) : (
                    <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
                        {userLoads.map(load => (
                            <div 
                                key={load._id} 
                                onClick={() => handleBooking(load._id)}
                                className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600"
                            >
                                <div className="font-semibold text-gray-900 dark:text-white">{load.pickupLocation} to {load.dropLocation}</div>
                                <div className="text-sm text-gray-500">{load.materialType} • ₹{load.price}</div>
                            </div>
                        ))}
                    </div>
                )}
                
                <button 
                    onClick={() => setSelectedTruck(null)}
                    className="w-full py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg"
                >
                    Cancel
                </button>
            </div>
        </div>
      )}
    </div>
  );
}
