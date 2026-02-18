"use client";
import dynamic from 'next/dynamic';

const LiveMap = dynamic(() => import('@/components/LiveMap'), { ssr: false });

export default function Tracking() {
    return (
        <div className="p-6 h-full flex flex-col">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Live GPS Tracking</h1>
            <div className="flex-1 bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden shadow-inner relative min-h-[500px]">
                <LiveMap />
                <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg z-[1000]">
                    <h3 className="font-bold mb-2 dark:text-white">Active Trucks</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-center space-x-2">
                            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="dark:text-gray-300">Truck HR-55-P-1234 (Moving)</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                            <span className="dark:text-gray-300">Truck RJ-32-G-9876 (Stopped)</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
