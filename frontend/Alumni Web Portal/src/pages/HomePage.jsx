import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAchievements, getEvents } from '../services/api';

function HomePage() {
  const [latestAchievements, setLatestAchievements] = useState([]);
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
    <div className="space-y-24 pb-20 font-sans text-slate-800"> 

      {/* --- SECTION 1: REFRESHING HERO --- */}
      <div className="relative overflow-hidden rounded-[2.5rem] mx-4 mt-6 shadow-2xl shadow-blue-900/20">
        
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-600 via-indigo-600 to-purple-700 opacity-100 animate-gradient-x"></div>
        
        {/* Decorative Floating Blobs */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-400/30 rounded-full blur-3xl animate-blob mix-blend-overlay"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-400/30 rounded-full blur-3xl animate-blob animation-delay-2000 mix-blend-overlay"></div>
        <div className="absolute bottom-[20%] left-[20%] w-[400px] h-[400px] bg-indigo-400/30 rounded-full blur-3xl animate-blob animation-delay-4000 mix-blend-overlay"></div>

        <div className="relative z-10 text-center px-6 py-28 md:py-40">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-md leading-tight">
            Welcome to the <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-200 to-cyan-200">Alumni Portal</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-50/90 mb-12 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow">
            Reconnect with your batchmates, discover new opportunities, and celebrate the success of our global community.
          </p>
          
          {/* --- FLOATING GLASS SEARCH BAR --- */}
          <form 
            onSubmit={handleSearchSubmit}
            className="max-w-2xl mx-auto relative group transform transition-all hover:scale-[1.02]"
          >
            <div className="absolute inset-0 bg-white/20 backdrop-blur-md rounded-full -m-1"></div>
            <div className="relative bg-white rounded-full shadow-xl flex items-center p-2 pl-6">
              <SearchIcon className="w-6 h-6 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search alumni by name, department..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-slate-700 placeholder-slate-400 text-lg px-4 py-2"
              />
              <button
                type="submit"
                className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-full px-8 py-3 shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/50 active:scale-95"
              >
                Search
              </button>
            </div>
          </form>
          {/* --- END SEARCH BAR --- */}

          <div className="mt-12 flex justify-center gap-8 text-sm font-semibold tracking-wide text-blue-100">
             <Link to="/alumni-list" className="hover:text-white flex items-center gap-2 transition-colors group">
                Browse Directory <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </Link>
             <Link to="/register" className="hover:text-white flex items-center gap-2 transition-colors group">
                Join Network <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>
        </div>
      </div>

      {/* --- SECTION 2: GLASSY FEATURE CARDS --- */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need</h2>
          <p className="text-slate-500 max-w-xl mx-auto text-lg">Manage your profile, connect with peers, and stay updated with the latest happenings.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<UsersIcon className="w-8 h-8 text-white" />}
            title="Find Alumni"
            description="Reconnect with old friends and search the directory by department or year."
            linkTo="/alumni-list"
            linkText="Go to Directory"
            gradient="from-blue-500 to-cyan-500"
            shadow="shadow-blue-500/20"
          />
          <FeatureCard
            icon={<SparklesIcon className="w-8 h-8 text-white" />}
            title="Share Your Story"
            description="Have a milestone to share? Register to post your achievements."
            linkTo="/register"
            linkText="Register Now"
            gradient="from-purple-500 to-pink-500"
            shadow="shadow-purple-500/20"
          />
          <FeatureCard
            icon={<TrophyIcon className="w-8 h-8 text-white" />}
            title="Explore Achievements"
            description="See the latest success stories and career milestones from our alumni."
            linkTo="/achievements"
            linkText="See Success Stories"
            gradient="from-amber-400 to-orange-500"
            shadow="shadow-orange-500/20"
          />
        </div>
      </div>

      {/* --- SECTION 3: DYNAMIC CONTENT (Refreshing Layout) --- */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Upcoming Events */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
              Upcoming Events
            </h2>
            <Link to="/events" className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">View All</Link>
          </div>
          
          {latestEvents.length > 0 ? (
            <div className="space-y-6">
              {latestEvents.map((event) => (
                <div key={event.id} className="group bg-white p-5 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-blue-100 hover:-translate-y-1 transition-all duration-300 flex gap-5 items-center relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-10 -mt-10 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                   
                   {/* Date Badge */}
                   <div className="shrink-0 w-20 text-center bg-blue-50/80 backdrop-blur-sm rounded-2xl p-3 group-hover:bg-blue-600 group-hover:text-white transition-colors relative z-10">
                      <span className="block text-2xl font-extrabold">{new Date(event.date).getDate()}</span>
                      <span className="block text-xs uppercase font-bold tracking-wider">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                   </div>
                   <div className="relative z-10">
                      <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{event.title}</h3>
                      <p className="text-slate-500 text-sm mt-1 flex items-center gap-1.5">
                        <MapPinIcon className="w-4 h-4" />
                        {event.location}
                      </p>
                   </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState text="No upcoming events found." />
          )}
        </div>
        
        {/* Latest Success Stories */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
              Latest Achievements
            </h2>
            <Link to="/achievements" className="text-sm font-bold text-purple-600 hover:text-purple-800 transition-colors">View All</Link>
          </div>
          
          {latestAchievements.length > 0 ? (
            <div className="space-y-6">
              {latestAchievements.map((ach) => (
                <div key={ach.id} className="group bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-purple-100 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-50 rounded-full -mr-12 -mb-12 opacity-50 group-hover:scale-125 transition-transform duration-500"></div>
                  
                  <div className="flex items-start gap-5 relative z-10">
                    <div className="bg-linear-to-br from-amber-400 to-orange-500 p-3.5 rounded-2xl text-white shadow-lg shadow-orange-200 transform group-hover:rotate-6 transition-transform">
                      <TrophyIconSize5 /> 
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 leading-snug group-hover:text-purple-700 transition-colors">{ach.title}</h3>
                      <p className="text-slate-500 text-sm mt-2 font-medium">
                        by <span className="text-slate-800">{ach.alumni_name}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
             <EmptyState text="No achievements yet." />
          )}
        </div>
      </div>
      
    </div>
  );
}

// --- REFRESHING UI COMPONENTS ---

function FeatureCard({ icon, title, description, linkTo, linkText, gradient, shadow }) {
  return (
    <div className={`bg-white p-8 rounded-4xl shadow-lg border border-slate-50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group relative overflow-hidden`}>
      <div className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${gradient} opacity-5 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500`}></div>
      
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-linear-to-br ${gradient} shadow-lg ${shadow} transform group-hover:rotate-6 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-500 mb-8 leading-relaxed">{description}</p>
      <Link
        to={linkTo}
        className="inline-flex items-center font-bold text-slate-700 hover:text-blue-600 transition-colors"
      >
        {linkText} 
        <ArrowRightIcon className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

const EmptyState = ({ text }) => (
  <div className="bg-slate-50 rounded-3xl p-12 text-center border border-dashed border-slate-200">
    <p className="text-slate-400 font-medium">{text}</p>
  </div>
);

// --- ICONS ---
const SearchIcon = ({className}) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const ArrowRightIcon = ({className}) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>;
const MapPinIcon = ({className}) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const UsersIcon = ({className}) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const SparklesIcon = ({className}) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;
const TrophyIcon = ({className}) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
const TrophyIconSize5 = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

export default HomePage;