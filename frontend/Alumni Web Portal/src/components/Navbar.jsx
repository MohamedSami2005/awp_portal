import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const { pathname } = useLocation();

  // --- UPDATED LINK STYLING ---
  const linkClass = (path) =>
    `
      relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ease-out
      
      ${
        pathname === path
          // Active: Gradient Blue Pill with Scale
          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 scale-105"
          // Inactive: Gray text -> Fades to Light Blue Tint & Lifts up on Hover
          : "text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 hover:shadow-sm hover:-translate-y-0.5"
      }
    `;

  return (
    // --- GLASS CONTAINER ---
    <nav className="fixed w-full top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/40 shadow-sm supports-backdrop-filter:bg-white/60">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 tracking-tight transition hover:opacity-80"
        >
          Alumni Portal
        </Link>

        <div className="flex items-center gap-2">
          {/* Navigation Pills */}
          <Link className={linkClass("/")} to="/">Home</Link>
          <Link className={linkClass("/alumni-list")} to="/alumni-list">Directory</Link>
          {/* 1. ADDED EVENTS BUTTON HERE */}
          <Link className={linkClass("/events")} to="/events">Events</Link>
          <Link className={linkClass("/achievements")} to="/achievements">Achievements</Link>
          
          {/* Register Button (Gradient Outline Style) */}
          <Link
            to="/register"
            className="
              ml-4 px-6 py-2.5 rounded-full font-bold text-sm
              bg-white text-blue-600 border border-blue-100
              shadow-sm transition-all duration-300
              hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 hover:shadow-md hover:-translate-y-0.5
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