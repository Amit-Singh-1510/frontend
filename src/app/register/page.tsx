"use client";
declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '../../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";

export default function Register() {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState(''); // For demo
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // State for Firebase result
  const [confirmationResult, setConfirmationResult] = useState<any>(null); // Use 'any' or ConfirmationResult if imported
  const router = useRouter();

  const handleGetOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const fullMobile = "+91" + mobile;

    try {
      // 1. Check if user exists on backend
      await axios.post('http://localhost:5000/api/auth/register/check-user', { mobile });

      // 2. Initialize Recaptcha
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible',
            'callback': (response: any) => {
              // reCAPTCHA solved
            }
          });
      }

      // 3. Send OTP
      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, fullMobile, appVerifier);
      setConfirmationResult(confirmation);
      
      setStep(2);
      alert('OTP Sent via Firebase!');
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.msg || err.message || 'Error sending OTP');
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmationResult) return;

    try {
      // 1. Verify OTP with Firebase
      await confirmationResult.confirm(otp);
      
      // 2. Register User in Backend
      const res = await axios.post('http://localhost:5000/api/auth/register/verify', {
        mobile, 
        otp: "FIREBASE_VERIFIED", 
        name, 
        password,
        isFirebaseVerified: true 
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      router.push('/');
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.msg || 'Verification failed (Invalid OTP)');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Create an Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account? <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Log in</Link>
          </p>
        </div>
        
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{error}</div>}

        {step === 1 ? (
          <form className="mt-8 space-y-6" onSubmit={handleGetOtp}>
            <div>
              <label htmlFor="mobile" className="sr-only">Mobile Number</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500 font-medium">+91</span>
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  required
                  className="appearance-none rounded-md block w-full pl-12 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  placeholder="Mobile Number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
            </div>
            
            <div id="recaptcha-container"></div>
            
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Send OTP
              </button>
            </div>
          </form>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleVerify}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label className="sr-only">OTP</label>
                <input
                  name="otp"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <div>
                <label className="sr-only">Full Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="sr-only">Password</label>
                <input
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Verify & Register
              </button>
            </div>
            <div className="text-center">
                <button type="button" onClick={() => setStep(1)} className="text-sm text-indigo-600 hover:text-indigo-500">Change Mobile Number</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
