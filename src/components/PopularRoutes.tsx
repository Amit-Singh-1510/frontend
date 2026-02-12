'use client';

import React from 'react';
import { FaMapMarkerAlt, FaArrowRight, FaTruck } from 'react-icons/fa';
import { motion } from 'framer-motion';

const routes = [
  { from: 'Neemrana', to: 'Jaipur', time: '3-4 Hrs', distance: '150 KM' },
  { from: 'Jaipur', to: 'Pune', time: '20-24 Hrs', distance: '1,100 KM' },
  { from: 'Delhi', to: 'Mumbai', time: '24-28 Hrs', distance: '1,400 KM' },
  { from: 'Bangalore', to: 'Hyderabad', time: '8-10 Hrs', distance: '570 KM' },
  { from: 'Ahmedabad', to: 'Surat', time: '4-5 Hrs', distance: '260 KM' },
  { from: 'Chennai', to: 'Kolkata', time: '28-32 Hrs', distance: '1,600 KM' },
];

export default function PopularRoutes() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors" id="routes">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Popular <span className="text-indigo-600">Routes</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We cover major industrial and commercial routes across India. Here are some of our most frequented transport lanes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {routes.map((route, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-2 group-hover:scale-110 transition-transform">
                    <FaMapMarkerAlt size={20} />
                  </div>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{route.from}</span>
                </div>

                <div className="flex-1 flex flex-col items-center px-4">
                  <div className="w-full h-0.5 bg-gray-200 dark:bg-gray-700 relative mb-1">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 px-2 text-gray-400">
                      <FaTruck className="text-xs animate-pulse" />
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 mt-1">{route.distance}</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center text-pink-600 dark:text-pink-400 mb-2 group-hover:scale-110 transition-transform">
                    <FaMapMarkerAlt size={20} />
                  </div>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{route.to}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-100 dark:border-gray-800">
                <span className="flex items-center gap-1">
                  Est. Time: <strong className="text-gray-700 dark:text-gray-300">{route.time}</strong>
                </span>
                <a href="#booking" className="text-indigo-600 hover:text-indigo-800 dark:hover:text-indigo-400 font-medium flex items-center gap-1 transition-colors">
                  Book Now <FaArrowRight size={12} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
