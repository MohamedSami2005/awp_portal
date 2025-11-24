import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    // Changed bg-gray-800 -> bg-slate-900 to match the blue theme better
    <footer className="bg-slate-900 text-slate-300 py-12 mt-24 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        {/* Logo / Title */}
        <Link 
          to="/" 
          className="text-2xl font-bold text-white hover:text-blue-400 transition-colors"
        >
          Alumni Portal
        </Link>
        
        <p className="mt-4 text-slate-400 max-w-md mx-auto">
          Connecting our past with our future. Join the network to mentor, share, and grow together.
        </p>

        {/* Navigation Links (Optional simple footer links) */}
        <div className="flex justify-center gap-6 mt-8 mb-8 text-sm font-medium">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/alumni-list" className="hover:text-white transition-colors">Directory</Link>
          <Link to="/achievements" className="hover:text-white transition-colors">Achievements</Link>
          <Link to="/register" className="hover:text-white transition-colors">Register</Link>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Alumni Web Portal. All rights reserved.
          </p>
          
          <div className="mt-4 md:mt-0">
            <Link 
              to="/admin" 
              className="px-4 py-2 rounded-full hover:bg-slate-800 hover:text-white transition-all"
            >
              Admin Login
            </Link>
          </div>
        </div>
        
      </div>
    </footer>
  );
}

export default Footer;