import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// ... imports

function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />
      
      {/* Added 'pt-24' to push content down below the fixed navbar */}
      <main className="max-w-6xl mx-auto p-6 pt-24 animate-fadeIn grow w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;