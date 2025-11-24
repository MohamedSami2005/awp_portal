import React, { useState, useEffect } from 'react';
import { getAchievements } from '../services/api';

function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      setIsLoading(true);
      try {
        const data = await getAchievements();
        setAchievements(data);
      } catch (error) {
        console.error('Failed to fetch achievements:', error);
      }
      setIsLoading(false);
    };

    fetchAchievements();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      
      {/* --- HEADER SECTION --- */}
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          Alumni <span className="text-blue-600">Achievements</span>
        </h2>
        <p className="mt-3 text-lg text-slate-600 max-w-2xl">
          Celebrating the milestones, awards, and success stories of our brilliant alumni network.
        </p>
      </div>

      {/* --- LOADING STATE --- */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-slate-500 font-medium">Loading success stories...</p>
        </div>
      ) : (
        
        /* --- ACHIEVEMENTS GRID --- */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.length > 0 ? (
            achievements.map((ach) => (
              <div 
                key={ach.id} 
                className="group relative bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Decorative Background Circle */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-blue-50 to-slate-50 rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-110 group-hover:from-blue-100 group-hover:to-blue-50"></div>

                <div className="relative z-10 flex items-start gap-5">
                  {/* Icon Badge */}
                  <div className="shrink-0 w-14 h-14 bg-yellow-50 rounded-xl flex items-center justify-center text-yellow-600 shadow-sm group-hover:bg-yellow-500 group-hover:text-white transition-colors duration-300">
                    <TrophyIcon />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-blue-700 transition-colors">
                      {ach.title}
                    </h3>
                    
                    <div className="mt-3 flex items-center gap-2 text-slate-600">
                      <UserIcon />
                      <span className="font-medium">{ach.alumni_name}</span>
                    </div>

                    {/* Description (if available) */}
                    {ach.description && (
                      <p className="mt-3 text-sm text-slate-500 leading-relaxed line-clamp-2">
                        {ach.description}
                      </p>
                    )}

                    {/* Date (if available) */}
                    {ach.date_posted && (
                      <div className="mt-4 pt-4 border-t border-slate-50 flex items-center text-xs text-slate-400 uppercase font-semibold tracking-wider">
                        <CalendarIcon />
                        <span>Posted on {new Date(ach.date_posted).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            
            /* --- EMPTY STATE --- */
            <div className="col-span-full flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <StarIcon />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">No achievements yet</h3>
              <p className="text-slate-500 mt-1">Be the first to share your success story!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// --- ICONS ---

const TrophyIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
);

const UserIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
);

const CalendarIcon = () => (
  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
);

const StarIcon = () => (
  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
);

export default Achievements;