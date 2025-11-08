import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      
      <main className="max-w-6xl mx-auto p-6 animate-fadeIn grow w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;