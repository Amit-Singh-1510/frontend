"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaBuilding, FaPhone, FaMapMarkerAlt, FaSave } from 'react-icons/fa';

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
      name: '',
      email: '',
      mobile: '',
      businessDetails: {
          companyName: '',
          contactPerson: '',
          gstNumber: '',
          address: ''
      }
  });

  useEffect(() => {
      fetchProfile();
  }, []);

  const fetchProfile = async () => {
      try {
          const token = localStorage.getItem('token');
          const res = await axios.get('http://localhost:5000/api/auth/user', {
              headers: { 'x-auth-token': token }
          });
          setUserData(res.data);
      } catch (err) {
          console.error('Error fetching profile', err);
      }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      if (name.startsWith('biz_')) {
          const field = name.replace('biz_', '');
          setUserData(prev => ({
              ...prev,
              businessDetails: { ...prev.businessDetails, [field]: value }
          }));
      } else {
          setUserData(prev => ({ ...prev, [name]: value }));
      }
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      // Implementation for update profile API would go here
      // For now, just simulating success
      setTimeout(() => {
          alert('Profile Updated Successfully (Simulation)');
          setLoading(false);
      }, 1000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
       <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Company Profile</h1>

       <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-6">
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contact Person Name</label>
                   <div className="relative">
                       <FaUser className="absolute left-3 top-3 text-gray-400"/>
                       <input type="text" name="name" value={userData.name} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white" />
                   </div>
               </div>
               <div>
                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mobile Number</label>
                   <div className="relative">
                       <FaPhone className="absolute left-3 top-3 text-gray-400"/>
                       <input type="text" name="mobile" value={userData.mobile} disabled className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-600 dark:text-gray-300 cursor-not-allowed" />
                   </div>
               </div>
           </div>

           <hr className="dark:border-gray-700"/>

           <div>
               <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center"><FaBuilding className="mr-2"/> Business Details</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Name</label>
                       <input type="text" name="biz_companyName" value={userData.businessDetails?.companyName || ''} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white" placeholder="Enter Company Name" />
                   </div>
                   <div>
                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">GST Number</label>
                       <input type="text" name="biz_gstNumber" value={userData.businessDetails?.gstNumber || ''} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white" placeholder="GSTIN" />
                   </div>
                   <div className="md:col-span-2">
                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Registered Address</label>
                       <div className="relative">
                           <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400"/>
                           <input type="text" name="biz_address" value={userData.businessDetails?.address || ''} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white" placeholder="Full Address" />
                       </div>
                   </div>
               </div>
           </div>

           <div className="flex justify-end pt-4">
               <button type="submit" disabled={loading} className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium flex items-center">
                   <FaSave className="mr-2"/>
                   {loading ? 'Saving...' : 'Save Changes'}
               </button>
           </div>

       </form>
    </div>
  );
}
