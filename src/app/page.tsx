import dynamic from 'next/dynamic';
import React from 'react';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import PopularRoutes from '@/components/PopularRoutes';
import BookingForm from '@/components/BookingForm';
import ContactForm from '@/components/ContactForm';

// Dynamically import Map to avoid SSR issues with Leaflet
const LiveMap = dynamic(() => import('../components/LiveMap'));

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Services />
      <PopularRoutes />
      
      <div className="py-20 bg-white dark:bg-black transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Live Tracking</h2>
            <p className="text-gray-600 dark:text-gray-400">Real-time location of your consignment across India.</p>
          </div>
          <LiveMap />
        </div>
      </div>

      <BookingForm />
      <ContactForm />
    </main>
  );
}
