import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const { pathname } = useLocation();

  
  
  const linkClass = (path) =>
    `
      px-3 py-2 rounded-md font-medium transition-all duration-300
      
      ${
        pathname === path
          
          ? "text-blue-600 font-semibold bg-blue-100"
         
          : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
      }
    `;
  

  return (
    <nav className="backdrop-blur bg-white/80 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="text-2xl font-bold text-blue-600 tracking-wide transition hover:opacity-75"
        >
          Alumni Portal
        </Link>
        <div className="flex gap-4 items-center">
     
          <Link className={linkClass("/")} to="/">Home</Link>
          <Link className={linkClass("/alumni-list")} to="/alumni-list">Directory</Link>
          <Link className={linkClass("/achievements")} to="/achievements">Achievements</Link>
          
       
          <Link
            to="/register"
            className="
              px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold
              transition-all duration-300 ease-in-out
              hover:bg-blue-700
              hover:-translate-y-0.5
              hover:shadow-xl
              hover:shadow-blue-500/50
            "
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;