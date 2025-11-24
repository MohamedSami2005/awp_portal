import React, { useState, useEffect } from 'react';
import { getEvents } from '../services/api';

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
      setIsLoading(false);
    };
    fetchEvents();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-slate-900">
          Upcoming <span className="text-blue-600">Events</span>
        </h2>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          Join us for workshops, reunions, and networking sessions. Don't miss out on the action!
        </p>
      </div>

      {/* Events Grid */}
      {isLoading ? (
        <div className="text-center py-20 text-slate-500">Loading events...</div>
      ) : events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id} className="group bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              {/* Image/Banner Placeholder */}
              <div className="h-48 bg-linear-to-br from-blue-500 to-indigo-600 relative">
                {event.banner ? (
                   <img src={event.banner} alt={event.title} className="w-full h-full object-cover" />
                ) : (
                   <div className="w-full h-full flex items-center justify-center text-white/30 text-6xl font-bold opacity-50">
                      {new Date(event.date).getDate()}
                   </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-blue-600 shadow-sm">
                  UPCOMING
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-3 font-medium">
                  <CalendarIcon className="w-4 h-4 text-blue-500" />
                  {new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {event.title}
                </h3>
                
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <MapPinIcon className="w-4 h-4" />
                  {event.location}
                </div>

                {/* BUTTON REMOVED HERE because there are no extra details to view */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
          <p className="text-slate-500 text-lg">No upcoming events scheduled at the moment.</p>
        </div>
      )}
    </div>
  );
}

// Icons
const CalendarIcon = ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const MapPinIcon = ({ className }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;

export default EventsPage;