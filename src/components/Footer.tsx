export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center justify-center md:justify-start">
              <span className="text-indigo-400 mr-2">Doctor</span>Transport
            </h3>
            <p className="text-gray-400">
           Delivering Trust, Not Just Goods. Reliable, GPS-enabled, and on-time transport solutions across India.
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-indigo-400 transition-colors">Services</a></li>
              <li><a href="#booking" className="hover:text-indigo-400 transition-colors">Book a Truck</a></li>
              <li><a href="#contact" className="hover:text-indigo-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
             <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
             <ul className="space-y-2 text-gray-400">
               <li>Email: amitbannaji296@gmail.com</li>
               <li>Phone: +91 8890149286</li>
               <li>Live 24/7 Support</li>
             </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          &copy; {new Date().getFullYear()} Doctor Transport. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
