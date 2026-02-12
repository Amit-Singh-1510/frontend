"use client";
import { FaTruckMoving, FaRoute, FaClock, FaShieldAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const services = [
  {
    icon: <FaTruckMoving className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />,
    title: 'Full Truck Load',
    description: 'Dedicated trucks for large shipments across India.'
  },
  {
    icon: <FaRoute className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />,
    title: 'Part Load',
    description: 'Cost-effective solutions for smaller shipments.'
  },
  {
    icon: <FaClock className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />,
    title: 'Express Delivery',
    description: 'Time-sensitive delivery for urgent consignments.'
  },
  {
    icon: <FaShieldAlt className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />,
    title: 'Secure Transport',
    description: 'Safe and insured transportation for high-value goods.'
  }
];

export default function Services() {
  return (
    <div id="services" className="py-20 bg-white dark:bg-black transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Services</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We offer a wide range of logistics solutions tailored to your needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div 
               key={index}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: index * 0.1, duration: 0.5 }}
               className="p-8 border border-gray-100 dark:border-gray-800 rounded-xl hover:shadow-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300 group"
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
