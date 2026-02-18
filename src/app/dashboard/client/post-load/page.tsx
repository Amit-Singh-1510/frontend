"use client";
import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '@/config';
import { useRouter } from 'next/navigation';
import { FaBox, FaMapMarkerAlt, FaTruck, FaRupeeSign, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';

export default function PostLoad() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropLocation: '',
    materialType: '',
    weight: '',
    truckTypeRequired: '14ft',
    truckCount: 1,
    price: '',
    pickupDate: '',
    isUrgent: false,
    isFragile: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/api/loads`, formData, {
        headers: { 'x-auth-token': token }
      });
      alert('Load posted successfully!');
      router.push('/dashboard/client/loads');
    } catch (err: any) {
      alert(err.response?.data?.msg || 'Error posting load');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Post a New Load</h1>
      
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-6">
        
        {/* Route Details */}
        <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center"><FaMapMarkerAlt className="mr-2 text-indigo-500"/> Route Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pickup Location</label>
                    <input type="text" required name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white text-gray-900" placeholder="City, Area" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Drop Location</label>
                    <input type="text" required name="dropLocation" value={formData.dropLocation} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white text-gray-900" placeholder="City, Area" />
                </div>
            </div>
        </div>

        {/* Load Details */}
        <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center"><FaBox className="mr-2 text-indigo-500"/> Shipment Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Material Type</label>
                    <input type="text" name="materialType" value={formData.materialType} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white text-gray-900" placeholder="e.g. Electronics, Furniture" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Weight (Appx)</label>
                    <input type="text" name="weight" value={formData.weight} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white text-gray-900" placeholder="e.g. 500kg, 2 Tons" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price Offer (₹)</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white text-gray-900" placeholder="Your Budget" />
                </div>
            </div>
        </div>

        {/* Truck Requirements */}
        <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center"><FaTruck className="mr-2 text-indigo-500"/> Truck Requirements</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Truck Type</label>
                    <select name="truckTypeRequired" value={formData.truckTypeRequired} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white text-gray-900">
                        <option value="Mini">Mini Truck</option>
                        <option value="14ft">14ft Container</option>
                        <option value="Trailer">Trailer</option>
                        <option value="Container">Large Container</option>
                        <option value="Any">Any Open Truck</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number of Trucks</label>
                    <input type="number" min="1" name="truckCount" value={formData.truckCount} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white text-gray-900" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pickup Date</label>
                    <input type="datetime-local" name="pickupDate" value={formData.pickupDate} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white text-gray-900" />
                </div>
            </div>
        </div>

        {/* Additional Options */}
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg flex flex-wrap gap-6">
            <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" name="isUrgent" checked={formData.isUrgent} onChange={handleChange} className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">Urgent Delivery</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" name="isFragile" checked={formData.isFragile} onChange={handleChange} className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">Fragile Goods</span>
            </label>
        </div>

        <div className="flex justify-end pt-4">
             <button
                type="submit"
                disabled={loading}
                className="py-3 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-70 flex items-center"
              >
                {loading ? 'Posting...' : 'Post Load Now'}
                {!loading && <FaTruck className="ml-2"/>}
              </button>
        </div>

      </form>
    </div>
  );
}
