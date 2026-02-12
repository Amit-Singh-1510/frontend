"use client";
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-black/50 dark:bg-black/70"></div>
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6"
        >
          Fast, Reliable & Secure <span className="text-indigo-400">Logistics</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-gray-200 mb-10 max-w-2xl"
        >
          Connecting businesses across India with our premium fleet. Real-time tracking, 24/7 support, and on-time delivery guaranteed.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a href="#booking" className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-lg">
            Book Now
          </a>
          <a href="#contact" className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold rounded-full transition-all shadow-lg backdrop-blur-sm">
            Contact Us
          </a>
        </motion.div>
      </div>
    </div>
  );
}
