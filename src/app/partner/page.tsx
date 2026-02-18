"use client";
import Link from 'next/link';
import { FaBuilding, FaTruck } from 'react-icons/fa';

export default function PartnerPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Partner with Us</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">Choose how you want to work with Doctor Transport</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* Business Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-indigo-500 cursor-pointer group">
          <div className="flex flex-col items-center text-center">
            <div className="bg-indigo-100 dark:bg-indigo-900 p-6 rounded-full mb-6 group-hover:bg-indigo-600 transition-colors">
              <FaBuilding className="h-12 w-12 text-indigo-600 dark:text-indigo-400 group-hover:text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">For Business</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Post loads, track shipments, and manage your logistics efficiently. get reliable trucks instantly.
            </p>
            <div className="space-y-4 w-full">
              <Link href="/register?role=business" className="block w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors">
                Register as Business
              </Link>
              <Link href="/login?role=business" className="block w-full py-3 px-6 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Login as Business
              </Link>
            </div>
          </div>
        </div>

        {/* Truck Owner Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-green-500 cursor-pointer group">
          <div className="flex flex-col items-center text-center">
            <div className="bg-green-100 dark:bg-green-900 p-6 rounded-full mb-6 group-hover:bg-green-600 transition-colors">
              <FaTruck className="h-12 w-12 text-green-600 dark:text-green-400 group-hover:text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">For Truck Owners</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Find verified loads, manage your fleet, and get paid securely. Grow your transport business with us.
            </p>
            <div className="space-y-4 w-full">
              <Link href="/register?role=owner" className="block w-full py-3 px-6 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                Register as Owner
              </Link>
              <Link href="/login?role=owner" className="block w-full py-3 px-6 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:border-green-500 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                Login as Owner
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
