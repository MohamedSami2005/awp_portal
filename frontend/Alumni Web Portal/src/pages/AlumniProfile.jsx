import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAlumniById } from '../services/api';

function AlumniProfile() {
  const { id } = useParams(); // Get ID from URL
  const [alumni, setAlumni] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAlumniById(id);
        setAlumni(data);
      } catch (error) {
        console.error("Failed to load profile");
      }
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  if (isLoading) return <div className="text-center py-20">Loading profile...</div>;
  if (!alumni) return <div className="text-center py-20">Alumni not found.</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Link to="/alumni-list" className="text-blue-600 hover:underline mb-6 inline-block">&larr; Back to Directory</Link>
      
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        {/* Banner / Header */}
        <div className="h-32 bg-linear-to-r from-blue-600 to-purple-600"></div>
        
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-12 mb-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-white p-1 shadow-lg">
              <div className="w-full h-full rounded-full bg-slate-200 flex items-center justify-center text-3xl font-bold text-slate-500">
                {alumni.name.charAt(0)}
              </div>
            </div>
            <span className="px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-bold border border-blue-100">
              Alumni
            </span>
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900">{alumni.name}</h1>
          <p className="text-lg text-slate-500 font-medium">{alumni.department} • Class of {alumni.year_of_passing}</p>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoCard label="Location" value={alumni.location} icon={<MapPinIcon />} />
            <InfoCard label="Department" value={alumni.department} icon={<BriefcaseIcon />} />
            <InfoCard label="Graduation Year" value={alumni.year_of_passing} icon={<AcademicIcon />} />
            <InfoCard label="Status" value="Verified Member" icon={<CheckBadgeIcon />} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
const InfoCard = ({ label, value, icon }) => (
  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{label}</p>
      <p className="text-slate-800 font-semibold">{value}</p>
    </div>
  </div>
);

// Icons
const MapPinIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const BriefcaseIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const AcademicIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>;
const CheckBadgeIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>;

export default AlumniProfile;