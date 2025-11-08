import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <Link 
          to="/" 
          className="text-xl font-bold text-white hover:text-gray-200"
        >
          Alumni Portal
        </Link>
        <p className="mt-2 text-sm">
          Connecting our past with our future.
        </p>

       
        <div className="mt-6 border-t border-gray-700 pt-6 text-xs text-gray-500">
          <p className="mb-2">
            © {new Date().getFullYear()} Alumni Web Portal. All rights reserved.
          </p>
          
          
          <Link 
            to="/admin" 
            className="text-gray-400 hover:text-white transition-colors"
          >
            Admin Login
          </Link>
         
        </div>
        
      </div>
    </footer>
  );
}

export default Footer;