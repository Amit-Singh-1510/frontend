"use client";
import { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import { API_URL } from '@/config';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaTruck, FaUser, FaBuilding, FaArrowLeft, FaCamera, FaCheck } from 'react-icons/fa';

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');

  // Registration Data
  const [role, setRole] = useState('business');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  
  // Truck Owner Specific Data
  const [truckDetails, setTruckDetails] = useState({
    truckNumber: '',
    truckType: '14ft',
    capacity: '',
    currentLocation: '',
    routes: '',
    availability: 'Available'
  });
  
  const [documents, setDocuments] = useState<{ [key: string]: File | null }>({
    rc: null,
    license: null,
    insurance: null,
    pollution: null,
    profilePhoto: null
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam === 'owner' || roleParam === 'business') {
      setRole(roleParam);
    }
  }, [searchParams]);

  const handleGetOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/auth/register/otp`, { mobile });
      // Show OTP in a cleaner way or toast, but for now alert is okay for "simulated" feedback
      if (res.data.otp) {
        alert(`${res.data.msg}. OTP: ${res.data.otp}`);
      } else {
        alert(res.data.msg);
      }
      setStep(2);
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (e.target.files && e.target.files[0]) {
      setDocuments({ ...documents, [field]: e.target.files[0] });
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData();
    formData.append('mobile', mobile);
    formData.append('otp', otp);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);

    if (role === 'owner') {
      formData.append('truckNumber', truckDetails.truckNumber);
      formData.append('truckType', truckDetails.truckType);
      formData.append('capacity', truckDetails.capacity);
      formData.append('currentLocation', truckDetails.currentLocation);
      formData.append('routes', truckDetails.routes);
      formData.append('availability', truckDetails.availability);
      formData.append('gpsEnabled', 'false');

      if (documents.rc) formData.append('rc', documents.rc);
      if (documents.license) formData.append('license', documents.license);
      if (documents.insurance) formData.append('insurance', documents.insurance);
      if (documents.pollution) formData.append('pollution', documents.pollution);
    }
    
    if (documents.profilePhoto) formData.append('profilePhoto', documents.profilePhoto);

    try {
      const res = await axios.post(`${API_URL}/api/auth/register/verify`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      if (role === 'owner') {
        router.push('/dashboard/owner');
      } else {
        router.push('/dashboard/client'); 
      }
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 bg-[url('/grid-bg.svg')]">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side / Top Banner - Abstract or Info */}
        <div className="md:w-1/3 bg-indigo-600 p-8 flex flex-col justify-between text-white">
          <div>
            <h2 className="text-3xl font-bold mb-4">Join Doctor Transport</h2>
            <p className="opacity-90">Start your journey with India's most trusted logistics partner.</p>
          </div>
          <div className="mt-8 md:mt-0">
             <div className="flex items-center space-x-2 mb-4">
               <div className="bg-white/20 p-2 rounded-full"><FaCheck className="w-4 h-4"/></div>
               <span className="text-sm">Verified Loads</span>
             </div>
             <div className="flex items-center space-x-2 mb-4">
               <div className="bg-white/20 p-2 rounded-full"><FaCheck className="w-4 h-4"/></div>
               <span className="text-sm">Secure Payments</span>
             </div>
             <div className="flex items-center space-x-2">
               <div className="bg-white/20 p-2 rounded-full"><FaCheck className="w-4 h-4"/></div>
               <span className="text-sm">24/7 Support</span>
             </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-2/3 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {step === 1 ? 'Get Started' : 'Complete Setup'}
            </h2>

            {error && <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md text-sm">{error}</div>}

            {step === 1 ? (
            <form onSubmit={handleGetOtp} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mobile Number</label>
                    <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-500">+91</span>
                        <input
                            type="tel"
                            required
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white dark:border-gray-600 outline-none text-gray-900"

                            placeholder="Enter 10-digit number"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                        />
                    </div>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">I am a...</label>
                    <div className="grid grid-cols-2 gap-4">
                        <div 
                            onClick={() => setRole('business')}
                            className={`cursor-pointer border-2 p-4 rounded-xl flex flex-col items-center justify-center transition-all ${role === 'business' ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30' : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'}`}
                        >
                            <FaBuilding className={`h-6 w-6 mb-2 ${role === 'business' ? 'text-indigo-600' : 'text-gray-400'}`} />
                            <span className={`font-medium text-sm ${role === 'business' ? 'text-indigo-900 dark:text-indigo-300' : 'text-gray-500'}`}>Business</span>
                        </div>
                        <div 
                            onClick={() => setRole('owner')}
                            className={`cursor-pointer border-2 p-4 rounded-xl flex flex-col items-center justify-center transition-all ${role === 'owner' ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30' : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'}`}
                        >
                            <FaTruck className={`h-6 w-6 mb-2 ${role === 'owner' ? 'text-indigo-600' : 'text-gray-400'}`} />
                            <span className={`font-medium text-sm ${role === 'owner' ? 'text-indigo-900 dark:text-indigo-300' : 'text-gray-500'}`}>Truck Owner</span>
                        </div>
                    </div>
                </div>

                <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl disabled:opacity-70 transform active:scale-95"
                >
                {loading ? 'Sending OTP...' : 'Send Verification OTP'}
                </button>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                    Already have an account? <Link href="/login" className="text-indigo-600 hover:text-indigo-500 font-semibold">Log in</Link>
                </p>
            </form>
            ) : (
            <form onSubmit={handleVerify} className="space-y-6">
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">OTP</label>
                            <input type="text" required className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white text-gray-900" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="0000" />

                            <p className="text-xs text-gray-500 mt-1">Simulated Mode: Try '1234'</p>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Full Name</label>
                            <input type="text" required className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white text-gray-900" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" />

                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Email (Optional)</label>
                            <input type="email" className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white text-gray-900" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" />

                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Password</label>
                            <input type="password" required className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white text-gray-900" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />

                        </div>
                    </div>
                     <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Profile Photo</label>
                        <div className="flex items-center px-4 py-2 border rounded-lg dark:border-gray-600">
                             <FaCamera className="text-gray-400 mr-2"/>
                             <input type="file" accept="image/*" className="block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" onChange={(e) => handleFileChange(e, 'profilePhoto')} />
                        </div>
                    </div>
                </div>

                {role === 'owner' && (
                    <div className="border-t pt-4 mt-4">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center"><FaTruck className="mr-2"/> Truck Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <input type="text" placeholder="Truck Number (e.g. HR-55-A-1234)" required className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white text-gray-900 text-sm" value={truckDetails.truckNumber} onChange={(e) => setTruckDetails({...truckDetails, truckNumber: e.target.value})} />

                            <select className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white text-gray-900 text-sm" value={truckDetails.truckType} onChange={(e) => setTruckDetails({...truckDetails, truckType: e.target.value})}>

                                <option value="Mini">Mini Truck</option>
                                <option value="14ft">14ft Container</option>
                                <option value="Trailer">Trailer</option>
                                <option value="Container">Large Container</option>
                            </select>
                            <input type="text" placeholder="Capacity (e.g. 10 Ton)" className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white text-gray-900 text-sm" value={truckDetails.capacity} onChange={(e) => setTruckDetails({...truckDetails, capacity: e.target.value})} />

                            <input type="text" placeholder="Home Base / Location" className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white text-gray-900 text-sm" value={truckDetails.currentLocation} onChange={(e) => setTruckDetails({...truckDetails, currentLocation: e.target.value})} />

                            <input type="text" placeholder="Pref. Routes (e.g. Delhi-Jaipur)" className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white text-gray-900 text-sm md:col-span-2" value={truckDetails.routes} onChange={(e) => setTruckDetails({...truckDetails, routes: e.target.value})} />

                        </div>

                        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Upload Documents</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {['rc', 'license', 'insurance', 'pollution'].map((doc) => (
                                <div key={doc} className="relative group">
                                    <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                                        <div className="flex flex-col items-center justify-center pt-2 pb-3">
                                            <p className="mb-1 text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">{doc}</p>
                                            <p className="text-[10px] text-gray-500">{documents[doc] ? 'File Selected' : 'Click to upload'}</p>
                                        </div>
                                        <input type="file" className="hidden" onChange={(e) => handleFileChange(e, doc)} />
                                    </label>
                                    {documents[doc] && <div className="absolute top-1 right-1 bg-green-500 w-2 h-2 rounded-full"></div>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex justify-between items-center pt-2">
                     <button type="button" onClick={() => setStep(1)} className="text-indigo-600 hover:text-indigo-500 text-sm font-semibold flex items-center"><FaArrowLeft className="mr-1"/> Change Number</button>
                     <button
                        type="submit"
                        disabled={loading}
                        className="py-3 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-70"
                      >
                        {loading ? 'Registering...' : 'Submit Registration'}
                      </button>
                </div>
            </form>
            )}
        </div>
      </div>
    </div>
  );
}

export default function Register() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <RegisterContent />
    </Suspense>
  );
}
