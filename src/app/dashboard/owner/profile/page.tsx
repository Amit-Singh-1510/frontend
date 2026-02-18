"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Profile() {
    const [profile, setProfile] = useState({
        name: '',
        mobile: '',
        email: '',
        profilePhoto: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:5000/api/auth/user', {
                    headers: { 'x-auth-token': token }
                });
                setProfile(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Profile</h1>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md max-w-2xl">
                 <div className="flex items-center space-x-6 mb-8">
                    <div className="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                        {profile.profilePhoto ? (
                            <img src={`http://localhost:5000/uploads/${profile.profilePhoto}`} alt="Profile" className="h-full w-full object-cover" />
                        ) : (
                            <span className="text-4xl text-gray-400">?</span>
                        )}
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-800 font-medium">Change Photo</button>
                 </div>

                 <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                        <input 
                            type="text" 
                            disabled 
                            value={profile.name} 
                            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 p-2 dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mobile Number</label>
                         <input 
                            type="text" 
                            disabled 
                            value={profile.mobile} 
                            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 p-2 dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                         <input 
                            type="email" 
                            value={profile.email} 
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                        Update Profile
                    </button>
                 </div>
            </div>
        </div>
    );
}
