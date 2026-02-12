"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function BookingForm() {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    date: '',
    truckType: 'container',
    weight: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Booking Request Sent! We will contact you shortly.');
    // Integrate with backend API here
  };

  return (
    <div id="booking" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Book Your Truck</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Origin</label>
              <input 
                type="text" 
                name="origin" 
                value={formData.origin}
                onChange={handleChange}
                placeholder="City, State"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-600 focus:ring-0 text-gray-900 dark:text-white transition-colors"
                required 
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Destination</label>
              <input 
                type="text" 
                name="destination" 
                value={formData.destination}
                onChange={handleChange}
                placeholder="City, State"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-600 focus:ring-0 text-gray-900 dark:text-white transition-colors"
                required 
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Date</label>
              <input 
                type="date" 
                name="date" 
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-600 focus:ring-0 text-gray-900 dark:text-white transition-colors"
                required 
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Truck Type</label>
              <select 
                name="truckType" 
                value={formData.truckType}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-600 focus:ring-0 text-gray-900 dark:text-white transition-colors"
              >
                <option value="container">Container (Closed)</option>
                <option value="open">Open Body</option>
                <option value="trailer">Trailer</option>
                <option value="tanker">Tanker</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Approx Weight (Tons)</label>
              <input 
                type="number" 
                name="weight" 
                value={formData.weight}
                onChange={handleChange}
                placeholder="e.g. 10"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-600 focus:ring-0 text-gray-900 dark:text-white transition-colors"
                required 
              />
            </div>
            <div className="md:col-span-2 mt-4">
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg">
                Get Quote & Book
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
