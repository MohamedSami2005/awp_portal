import React, { useState } from 'react';
import { registerAlumni } from '../services/api';

function AlumniRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    year_of_passing: '',
    location: '',
    achievements: '',
  });
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(''); // 'success' or 'error'
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setStatus('');
    
    try {
      const res = await registerAlumni(formData);
      setMessage(res.message);
      setStatus('success');
      setFormData({
        name: '',
        department: '',
        year_of_passing: '',
        location: '',
        achievements: '',
      });
    } catch (error) {
      setMessage('Registration failed. Please try again.');
      setStatus('error');
    }
    setIsLoading(false);
  };

  return (
    
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* --- LEFT SIDE: BRANDING & INFO --- */}
        <div className="md:w-2/5 bg-linear-to-br from-blue-600 to-indigo-700 p-10 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-indigo-500/30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold tracking-tight mb-4">Alumni Network</h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              Join a thriving community of graduates. Connect, mentor, and share your success stories with the world.
            </p>
          </div>

          <div className="relative z-10 mt-12 md:mt-0">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </div>
              <div>
                <p className="font-bold text-lg">Expand Network</p>
                <p className="text-blue-200 text-sm">Connect with peers</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <div>
                <p className="font-bold text-lg">Share Success</p>
                <p className="text-blue-200 text-sm">Post your achievements</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE: FORM --- */}
        <div className="md:w-3/5 p-10 bg-white">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-slate-800">Create your profile</h3>
            <p className="text-slate-500 text-sm mt-1">Fill in your details to get verified.</p>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-xl border flex items-start gap-3 ${status === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
              {status === 'success' ? (
                <svg className="w-5 h-5 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              ) : (
                <svg className="w-5 h-5 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              )}
              <p className="text-sm font-medium">{message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Full Name */}
            <div className="space-y-1">
              <label htmlFor="name" className="block text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white transition-all"
                placeholder="John Doe"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Department */}
              <div className="space-y-1">
                <label htmlFor="department" className="block text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Department</label>
                <input
                  id="department"
                  name="department"
                  type="text"
                  required
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white transition-all"
                  placeholder="e.g. CSE"
                />
              </div>

              {/* Year */}
              <div className="space-y-1">
                <label htmlFor="year_of_passing" className="block text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Batch Year</label>
                <input
                  id="year_of_passing"
                  name="year_of_passing"
                  type="number"
                  required
                  value={formData.year_of_passing}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white transition-all"
                  placeholder="e.g. 2023"
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-1">
              <label htmlFor="location" className="block text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Current Location</label>
              <input
                id="location"
                name="location"
                type="text"
                required
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white transition-all"
                placeholder="City, Country"
              />
            </div>

            {/* Achievements */}
            <div className="space-y-1">
              <label htmlFor="achievements" className="block text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                Achievements <span className="text-slate-400 font-normal lowercase">(optional)</span>
              </label>
              <textarea
                id="achievements"
                name="achievements"
                rows="3"
                value={formData.achievements}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white transition-all resize-none"
                placeholder="Briefly describe your key achievements..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Processing...
                </div>
              ) : (
                'Register'
              )}
            </button>

          </form>
        </div>
      </div>
    
  );
}

export default AlumniRegistration;