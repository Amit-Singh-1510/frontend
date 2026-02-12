"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      await axios.post('http://localhost:5000/api/contact', formData);
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      console.error(err);
      setStatus('Failed to send message. Please try again.');
    }
  };

  return (
    <div id="contact" className="py-20 bg-white dark:bg-black transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Get In Touch</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have questions? We are here to help you 24/7. Reach out to us for any transport related queries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8 }}
             className="space-y-8"
          >
            <div className="flex items-start space-x-4">
              <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-lg">
                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Our Location</h3>
                <p className="mt-1 text-gray-600 dark:text-gray-400">Doctor Transport, Neemrana, India</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-lg">
                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Email Us</h3>
                <p className="mt-1 text-gray-600 dark:text-gray-400">amitbannaji296@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
               <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-lg">
                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Call Us</h3>
                <p className="mt-1 text-gray-600 dark:text-gray-400">+91 8890149286</p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            onSubmit={handleSubmit} 
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required 
                className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-white transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Email</label>
               <input type="email" name="email" value={formData.email} onChange={handleChange} required 
                 className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-white transition-colors"
                 placeholder="john@example.com"
               />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mobile Number</label>
               <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                 className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-white transition-colors"
                 placeholder="+91 98765 43210"
               />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
               <textarea name="message" rows={4} value={formData.message} onChange={handleChange} required 
                 className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-white transition-colors"
                 placeholder="How can we help you?"
               ></textarea>
            </div>
            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
              Send Message
            </button>
            {status && <p className={`text-sm mt-2 text-center ${status.includes('success') ? 'text-green-600' : 'text-red-600'}`}>{status}</p>}
          </motion.form>
        </div>
      </div>
    </div>
  );
}
