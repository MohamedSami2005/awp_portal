import React, { useState, useEffect } from 'react';
// FIX: Added 'Link' to the imports below
import { useSearchParams, Link } from 'react-router-dom';
import { getAlumniList } from '../services/api';

function AlumniList() {
  const [alumni, setAlumni] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [filters, setFilters] = useState({ 
    department: searchParams.get('department') || '', 
    year_of_passing: searchParams.get('year_of_passing') || '', 
    location: searchParams.get('location') || '',
    search: searchParams.get('search') || '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAlumni = async () => {
      setIsLoading(true);
      try {
        const activeFilters = Object.fromEntries(
          Object.entries(filters).filter(([_, v]) => v !== '')
        );
        const data = await getAlumniList(activeFilters);
        setAlumni(data);
        setSearchParams(activeFilters);
      } catch (error) {
        console.error('Failed to fetch alumni:', error);
      }
      setIsLoading(false);
    };

    fetchAlumni();
  }, [filters, setSearchParams]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* --- HEADER --- */}
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Alumni Directory</h2>
        <p className="mt-2 text-slate-600">Find and connect with fellow graduates.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* --- SIDEBAR FILTERS --- */}
        <aside className="lg:w-1/4">
          <form
            onSubmit={handleFilterSubmit}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-24"
          >
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <FilterIcon /> Filters
            </h3>
            
            <div className="space-y-5">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-slate-700 mb-1">Search Name</label>
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    id="search"
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                    placeholder="e.g. Jane Doe"
                    className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="department" className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                <input
                  id="department"
                  name="department"
                  value={filters.department}
                  onChange={handleFilterChange}
                  placeholder="e.g. CSE"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              <div>
                <label htmlFor="year_of_passing" className="block text-sm font-medium text-slate-700 mb-1">Class Year</label>
                <input
                  type="number"
                  id="year_of_passing"
                  name="year_of_passing"
                  value={filters.year_of_passing}
                  onChange={handleFilterChange}
                  placeholder="e.g. 2022"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    id="location"
                    name="location"
                    value={filters.location}
                    onChange={handleFilterChange}
                    placeholder="e.g. Chennai"
                    className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-lg transition-all shadow-md hover:shadow-lg mt-2"
              >
                Apply Filters
              </button>
            </div>
          </form>
        </aside>

        {/* --- ALUMNI GRID --- */}
        <main className="lg:w-3/4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-48 animate-pulse">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                      <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="space-y-2 mt-6">
                    <div className="h-3 bg-slate-200 rounded w-full"></div>
                    <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {alumni.length > 0 ? (
                alumni.map((alum) => (
                  <div
                    key={alum.id}
                    className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-200 transition-all duration-300 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        {/* Avatar Initials */}
                        <div className="h-14 w-14 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-xl font-bold shadow-md">
                          {alum.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{alum.name}</h3>
                          <p className="text-sm font-medium text-slate-500">{alum.department} • {alum.year_of_passing}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      <div className="flex items-center text-sm text-slate-600">
                        <MapPinIcon className="w-4 h-4 mr-2 text-slate-400" />
                        {alum.location}
                      </div>
                      <div className="flex items-center text-sm text-slate-600">
                        <BriefcaseIcon className="w-4 h-4 mr-2 text-slate-400" />
                        <span>Alumni Member</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                       {/* THIS WAS THE CAUSE OF YOUR ERROR. NOW IT IS FIXED. */}
                       <Link 
                         to={`/alumni/${alum.id}`} 
                         className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                       >
                          View Profile &rarr;
                       </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-12 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-dashed border-slate-300">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <SearchIcon className="w-8 h-8 text-slate-300" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900">No alumni found</h3>
                  <p className="text-slate-500 mt-1">Try adjusting your search or filters.</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// --- ICONS ---
const SearchIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
);
const FilterIcon = () => (
  <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
);
const MapPinIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);
const BriefcaseIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);

export default AlumniList;