"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

interface Truck {
  _id: string;
  truckNumber: string;
  type: string;
  capacity: string;
  location: string;
  available: boolean;
}

export default function MyTrucks() {
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    truckNumber: '',
    type: '14ft', // Default
    capacity: '',
    location: '',
    available: true
  });

  const fetchTrucks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/trucks', {
        headers: { 'x-auth-token': token }
      });
      setTrucks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrucks();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/trucks', formData, {
        headers: { 'x-auth-token': token }
      });
      setShowModal(false);
      fetchTrucks(); // Refresh list
      // Reset form
      setFormData({
        truckNumber: '',
        type: '14ft',
        capacity: '',
        location: '',
        available: true
      });
    } catch (err) {
      console.error(err);
      alert('Error adding truck');
    }
  };

  const deleteTruck = async (id: string) => {
    if (!confirm('Are you sure you want to delete this truck?')) return;
    try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/trucks/${id}`, {
            headers: { 'x-auth-token': token }
        });
        fetchTrucks();
    } catch (err) {
        console.error(err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Trucks</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          <FaPlus className="mr-2" /> Add Truck
        </button>
      </div>

      {loading ? (
        <p>Loading trucks...</p>
      ) : trucks.length === 0 ? (
        <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p className="text-gray-500">No trucks added yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trucks.map((truck) => (
            <div key={truck._id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{truck.truckNumber}</h3>
                  <p className="text-sm text-gray-500">{truck.type}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${truck.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {truck.available ? 'Available' : 'Busy'}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Capacity:</strong> {truck.capacity}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Location:</strong> {truck.location}</p>
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                <button className="text-blue-600 hover:text-blue-800 p-2"><FaEdit /></button>
                <button onClick={() => deleteTruck(truck._id)} className="text-red-600 hover:text-red-800 p-2"><FaTrash /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Truck Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Add New Truck</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Truck Number</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2 border"
                  value={formData.truckNumber}
                  onChange={(e) => setFormData({...formData, truckNumber: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2 border"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                    <option value="Mini">Mini Truck</option>
                    <option value="14ft">14ft</option>
                    <option value="Trailer">Trailer</option>
                    <option value="Container">Container</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Capacity</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2 border"
                  value={formData.capacity}
                  onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                  placeholder="e.g. 10 Ton"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Location</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2 border"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="City, State"
                />
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 bg-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Add Truck
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
