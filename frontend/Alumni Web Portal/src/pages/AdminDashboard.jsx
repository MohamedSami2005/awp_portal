import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getPendingAlumni,
  approveAlumni,
  rejectAlumni,
  adminLogout,
  getAdminStats,
  getAchievements,
  deleteAchievement,
  getEvents,
  createEvent,
  deleteEvent,
  getAlumniList,
  createAchievement
} from '../services/api';

function AdminDashboard() {
  const [stats, setStats] = useState({ totalAlumni: 0, pendingApprovals: 0, totalAchievements: 0, totalEvents: 0 });
  const [pending, setPending] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [events, setEvents] = useState([]);
  const [allAlumni, setAllAlumni] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', location: '', date: '', banner: null });

  const [showAchieveForm, setShowAchieveForm] = useState(false);
  const [newAchieve, setNewAchieve] = useState({ title: '', description: '', alumni: '' });

  const navigate = useNavigate();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [statsData, pendingData, achData, eventData, alumniData] = await Promise.all([
        getAdminStats(),
        getPendingAlumni(),
        getAchievements(),
        getEvents(),
        getAlumniList({})
      ]);
      setStats(statsData);
      setPending(pendingData);
      setAchievements(achData);
      setEvents(eventData);
      setAllAlumni(alumniData);
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) navigate('/admin');
    else fetchData();
  }, [navigate]);

  // --- Handlers ---
  const handleApprove = async (id) => { await approveAlumni(id); fetchData(); };
  const handleReject = async (id) => { if (window.confirm('Reject this registration?')) { await rejectAlumni(id); fetchData(); } };
  const handleDeleteAlumni = async (id) => { if (window.confirm('Delete this alumni member?')) { await rejectAlumni(id); fetchData(); } };
  const handleDeleteAchievement = async (id) => { if (window.confirm('Delete achievement?')) { await deleteAchievement(id); fetchData(); } };
  const handleDeleteEvent = async (id) => { if (window.confirm('Delete event?')) { await deleteEvent(id); fetchData(); } };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newEvent.title);
    formData.append('location', newEvent.location);
    formData.append('date', newEvent.date);
    if (newEvent.banner) formData.append('banner', newEvent.banner);
    try { await createEvent(formData); setShowEventForm(false); setNewEvent({ title: '', location: '', date: '', banner: null }); fetchData(); } catch (error) { alert('Failed to create event.'); }
  };

  const handleAchieveSubmit = async (e) => {
    e.preventDefault();
    if (!newAchieve.alumni) { alert('Please select an alumni member.'); return; }
    try { await createAchievement(newAchieve); setShowAchieveForm(false); setNewAchieve({ title: '', description: '', alumni: '' }); fetchData(); } catch (error) { alert('Failed to add achievement.'); }
  };

  const handleLogout = () => { adminLogout(); navigate('/admin'); };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans text-slate-800 pb-20 selection:bg-indigo-100 selection:text-indigo-700">
      
      {/* --- BACKGROUND --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-blob"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-200/40 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-indigo-200/40 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-blob animation-delay-4000"></div>
      </div>

      {/* --- HEADER --- */}
      <header className="sticky top-4 z-40 px-6">
        <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm rounded-2xl px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-slate-800 to-slate-600">Admin Dashboard</h1>
          </div>
          <button onClick={handleLogout} className="group flex items-center gap-2 px-5 py-2 bg-white border border-slate-100 text-slate-600 rounded-full text-sm font-semibold transition-all hover:border-red-100 hover:bg-red-50 hover:text-red-600 shadow-sm hover:shadow">
            <span className="group-hover:-translate-x-0.5 transition-transform">Logout</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8 relative z-10">
        
        {/* --- STATS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Alumni" value={stats.totalAlumni} icon={<UsersIcon />} gradient="from-blue-500 to-cyan-500" />
          <StatCard title="Pending" value={stats.pendingApprovals} icon={<ClockIcon />} gradient="from-amber-400 to-orange-500" />
          <StatCard title="Achievements" value={stats.totalAchievements} icon={<TrophyIcon />} gradient="from-purple-500 to-pink-500" />
          <StatCard title="Events" value={stats.totalEvents} icon={<CalendarIcon />} gradient="from-emerald-400 to-teal-500" />
        </div>
        
        {/* --- PENDING APPROVALS --- */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-bold text-slate-800">Pending Approvals</h2>
            {pending.length > 0 && <span className="px-2.5 py-0.5 bg-amber-100 text-amber-700 text-xs font-bold rounded-full shadow-sm ring-1 ring-amber-200">{pending.length} New</span>}
          </div>

          {pending.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {pending.map((alum) => (
                <div key={alum.id} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-white/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{alum.name}</h3>
                      <p className="text-sm text-slate-500 font-medium">{alum.department} • {alum.year_of_passing}</p>
                    </div>
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-lg font-medium">{alum.location}</span>
                  </div>
                  
                  <div className="flex gap-3 mt-6">
                    <button onClick={() => handleApprove(alum.id)} className="flex-1 py-2.5 bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl text-sm font-semibold shadow-lg shadow-indigo-200 transition-all">Approve</button>
                    <button onClick={() => handleReject(alum.id)} className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-100 rounded-xl text-sm font-semibold transition-all">Reject</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white/60 backdrop-blur-sm p-10 rounded-2xl border border-white/50 border-dashed text-center">
              <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500 shadow-inner"><CheckIcon /></div>
              <p className="text-slate-500">All caught up! No pending requests.</p>
            </div>
          )}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* --- MANAGE EVENTS --- */}
          <GlassSection title="Events" icon={<CalendarIcon className="w-5 h-5 text-emerald-600" />} 
            action={<button onClick={() => setShowEventForm(!showEventForm)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${showEventForm ? 'bg-slate-100 text-slate-600' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}>{showEventForm ? 'Close' : '+ Event'}</button>}>
            
            {showEventForm && (
              <form onSubmit={handleEventSubmit} className="mb-6 p-5 bg-emerald-50/50 rounded-xl border border-emerald-100/50 animate-fadeIn space-y-4">
                <input required placeholder="Event Title" className="w-full p-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} />
                <div className="grid grid-cols-2 gap-3">
                  <input required placeholder="Location" className="w-full p-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" value={newEvent.location} onChange={e => setNewEvent({...newEvent, location: e.target.value})} />
                  <input required type="date" className="w-full p-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} />
                </div>
                <input type="file" className="w-full p-2.5 bg-white rounded-xl border border-slate-200 text-sm" onChange={e => setNewEvent({...newEvent, banner: e.target.files[0]})} />
                <button type="submit" className="w-full py-2.5 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all bg-linear-to-r from-emerald-500 to-teal-500 shadow-emerald-200">Publish Event</button>
              </form>
            )}

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
              {events.length > 0 ? events.map(event => (
                // FIXED: Added explicit flex classes here
                <div key={event.id} className="flex items-center justify-between p-3 bg-white/60 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-white hover:shadow-sm transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <CalendarIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm group-hover:text-emerald-600 transition-colors">{event.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{new Date(event.date).toLocaleDateString()} • {event.location}</p>
                    </div>
                  </div>
                  <button onClick={() => handleDeleteEvent(event.id)} className="text-slate-400 hover:text-red-600 p-2 bg-white rounded-lg shadow-sm hover:shadow border border-slate-100 hover:border-red-100 transition-all">
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              )) : <EmptyState text="No upcoming events." />}
            </div>
          </GlassSection>

          {/* --- MANAGE ACHIEVEMENTS --- */}
          <GlassSection title="Achievements" icon={<TrophyIcon className="w-5 h-5 text-purple-600" />}
            action={<button onClick={() => setShowAchieveForm(!showAchieveForm)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${showAchieveForm ? 'bg-slate-100 text-slate-600' : 'bg-purple-50 text-purple-700 hover:bg-purple-100'}`}>{showAchieveForm ? 'Close' : '+ Award'}</button>}>
            
            {showAchieveForm && (
              <form onSubmit={handleAchieveSubmit} className="mb-6 p-5 bg-purple-50/50 rounded-xl border border-purple-100/50 animate-fadeIn space-y-4">
                <input required placeholder="Achievement Title" className="w-full p-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all" value={newAchieve.title} onChange={e => setNewAchieve({...newAchieve, title: e.target.value})} />
                <select required className="w-full p-2.5 rounded-xl border border-slate-200 text-sm bg-white outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all" value={newAchieve.alumni} onChange={e => setNewAchieve({...newAchieve, alumni: e.target.value})}>
                  <option value="">Select Alumni...</option>
                  {allAlumni.map(alum => (<option key={alum.id} value={alum.id}>{alum.name}</option>))}
                </select>
                <textarea placeholder="Description" className="w-full p-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all" rows="2" value={newAchieve.description} onChange={e => setNewAchieve({...newAchieve, description: e.target.value})} />
                <button type="submit" className="w-full py-2.5 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all bg-linear-to-r from-purple-500 to-pink-500 shadow-purple-200">Post Achievement</button>
              </form>
            )}

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
              {achievements.length > 0 ? achievements.map(ach => (
                // FIXED: Added explicit flex classes here
                <div key={ach.id} className="flex items-center justify-between p-3 bg-white/60 rounded-xl border border-slate-100 hover:border-purple-200 hover:bg-white hover:shadow-sm transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-100 to-pink-100 text-purple-600 flex items-center justify-center text-xs font-bold shadow-inner shrink-0">
                      <TrophyIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm group-hover:text-purple-600 transition-colors">{ach.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">by {ach.alumni_name}</p>
                    </div>
                  </div>
                  <button onClick={() => handleDeleteAchievement(ach.id)} className="text-slate-400 hover:text-red-600 p-2 bg-white rounded-lg shadow-sm hover:shadow border border-slate-100 hover:border-red-100 transition-all">
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              )) : <EmptyState text="No achievements posted." />}
            </div>
          </GlassSection>

        </div>

        {/* --- DIRECTORY --- */}
        <GlassSection title="Directory" icon={<UsersIcon className="w-5 h-5 text-blue-600" />} count={allAlumni.length}>
          <div className="overflow-x-auto max-h-96 scrollbar-thin">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50/80 text-slate-500 uppercase font-bold sticky top-0 backdrop-blur-sm z-10">
                <tr><th className="px-6 py-3 rounded-tl-xl">Name</th><th className="px-6 py-3">Dept</th><th className="px-6 py-3">Year</th><th className="px-6 py-3">Location</th><th className="px-6 py-3 text-right rounded-tr-xl">Action</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {allAlumni.map(alum => (
                  <tr key={alum.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-3.5 font-medium text-slate-900">{alum.name}</td>
                    <td className="px-6 py-3.5">{alum.department}</td>
                    <td className="px-6 py-3.5"><span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs font-bold">{alum.year_of_passing}</span></td>
                    <td className="px-6 py-3.5 text-slate-500">{alum.location}</td>
                    <td className="px-6 py-3.5 text-right">
                        <button onClick={() => handleDeleteAlumni(alum.id)} className="text-slate-400 hover:text-red-600 transition-colors">
                            <TrashIcon className="w-4 h-4" />
                        </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {allAlumni.length === 0 && <EmptyState text="Directory empty." />}
          </div>
        </GlassSection>

      </main>
      
      {/* Inline Styles for Scrollbars */}
      <style>{`
        .scrollbar-thin::-webkit-scrollbar { width: 6px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; }
      `}</style>
    </div>
  );
}

// --- UI COMPONENTS ---

const GlassSection = ({ title, icon, action, count, children }) => (
  <section className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-200/50 border border-white/60 overflow-hidden flex flex-col">
    <div className="px-6 py-5 border-b border-slate-100/50 flex justify-between items-center">
      <h2 className="text-lg font-bold flex items-center gap-3 text-slate-800">
        <div className="p-1.5 bg-white rounded-lg shadow-sm border border-slate-100">
          {icon}
        </div>
        {title}
        {count !== undefined && <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full text-slate-500 font-semibold">{count}</span>}
      </h2>
      {action}
    </div>
    <div className="p-0">{children}</div>
  </section>
);

const StatCard = ({ title, value, icon, gradient }) => (
  <div className="bg-white/80 backdrop-blur-md p-5 rounded-3xl shadow-lg shadow-slate-200/50 border border-white/60 flex items-center gap-4 transition-all hover:-translate-y-1 hover:shadow-xl group">
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 bg-linear-to-br ${gradient} text-white shadow-lg transition-transform group-hover:scale-110`}>
      {icon}
    </div>
    <div>
      <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-0.5">{title}</p>
      <h3 className="text-3xl font-extrabold text-slate-800">{value}</h3>
    </div>
  </div>
);

const EmptyState = ({ text }) => <div className="p-8 text-center text-slate-400 italic text-sm">{text}</div>;

// --- ICONS ---
const UsersIcon = ({className="w-6 h-6"}) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const ClockIcon = ({className="w-6 h-6"}) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const TrophyIcon = ({className="w-6 h-6"}) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
const CalendarIcon = ({className="w-6 h-6"}) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const CheckIcon = ({className="w-6 h-6"}) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>;
const TrashIcon = ({className}) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;

export default AdminDashboard;