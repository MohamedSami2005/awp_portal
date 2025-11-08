import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAchievements, getEvents } from '../services/api';

function HomePage() {
  const [latestAchievements, setLatestAchievements] =useState([]);
  const [latestEvents, setLatestEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [achData, eventData] = await Promise.all([
          getAchievements(),
          getEvents(),
        ]);
        setLatestAchievements(achData.slice(0, 2));
        setLatestEvents(eventData.slice(0, 2));
      } catch (error) {
        console.error("Failed to fetch homepage data:", error);
      }
    };
    fetchHomeData();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/alumni-list?search=${searchTerm.trim()}`);
    }
  };

  return (
    <div className="space-y-20">

     
      <div
        className={
          "text-center p-16 md:py-24 rounded-lg shadow-lg " +
          "bg-[linear-gradient(to_bottom_right,var(--color-blue-100),var(--color-purple-100),var(--color-pink-100))] " +
          "animate-gradient"
        }
      >
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          Welcome to the Alumni Portal
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Connect, network, and stay updated with your fellow alumni.
        </p>
        
        <form 
          onSubmit={handleSearchSubmit}
          className="max-w-xl mx-auto flex gap-2 mb-8"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search alumni by name..."
            className="w-full px-5 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg transition hover:bg-blue-700"
          >
            Search
          </button>
        </form>

        <div className="space-x-4">
          <Link
            to="/alumni-list"
            className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition hover:bg-blue-700 hover:shadow-md"
          >
            View Directory
          </Link>
          <Link
            to="/register"
            className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg transition border border-gray-300 hover:bg-gray-100 hover:shadow-md"
          >
            Register Now
          </Link>
        </div>
      </div>

     
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        
      
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Upcoming Events
          </h2>
          {latestEvents.length > 0 ? (
            <div className="space-y-4">
              {latestEvents.map((event) => (
                <div
                  key={event.id}
                  className="
                    bg-white p-6 rounded-lg shadow-md border border-gray-200
                    min-h-[130px] // 1. Added minimum height for balance
                    transition-all duration-300 hover:shadow-xl hover:-translate-y-1 // 2. Added hover effect
                  "
                >
                  <span className="text-sm font-semibold text-blue-600">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </span>
                  <h3 className="text-xl font-bold mt-1">{event.title}</h3>
                  <p className="text-gray-600 mt-1">{event.location}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No upcoming events.</p>
          )}
        </div>
        
       
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Latest Success Stories
          </h2>
          {latestAchievements.length > 0 && (
            <div className="space-y-4">
              {latestAchievements.map((ach) => (
                <div
                  key={ach.id}
                  className="
                    bg-white p-6 rounded-lg shadow-md border border-gray-200
                    min-h-[130px] // 1. Added minimum height for balance
                    transition-all duration-300 hover:shadow-xl hover:-translate-y-1 // 2. Added hover effect
                  "
                >
                  <h3 className="text-xl font-bold">{ach.title}</h3>
                  <p className="text-gray-700 mt-1">
                    - <span className="font-medium">{ach.alumni_name}</span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}



export default HomePage;