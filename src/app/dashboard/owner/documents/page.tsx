"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '@/config';

export default function Documents() {
    const [docs, setDocs] = useState<any>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch user docs
        const fetchDocs = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`${API_URL}/api/auth/user`, {
                    headers: { 'x-auth-token': token }
                });
                setDocs(res.data.documents || {});
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDocs();
    }, []);

    const DocItem = ({ title, status, file }: { title: string, status: string, file?: string }) => (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                <p className={`text-sm mt-1 ${status === 'Verified' ? 'text-green-600' : 'text-yellow-600'}`}>
                    Status: {status}
                </p>
                {file && <p className="text-xs text-gray-500 mt-1">File: {file}</p>}
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                {file ? 'Update' : 'Upload'}
            </button>
        </div>
    );

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Document Verification</h1>
            
            <div className="space-y-6 max-w-3xl">
                <DocItem 
                    title="RC (Registration Certificate)" 
                    status={docs.rc ? 'Verified' : 'Pending'} 
                    file={docs.rc}
                />
                <DocItem 
                    title="Driving License" 
                    status={docs.license ? 'Verified' : 'Pending'} 
                    file={docs.license}
                />
                <DocItem 
                    title="Insurance Policy" 
                    status={docs.insurance ? 'Verified' : 'Pending'} 
                    file={docs.insurance}
                />
                <DocItem 
                    title="Pollution Certificate" 
                    status={docs.pollution ? 'Verified' : 'Pending'} 
                    file={docs.pollution}
                />
            </div>
        </div>
    );
}
