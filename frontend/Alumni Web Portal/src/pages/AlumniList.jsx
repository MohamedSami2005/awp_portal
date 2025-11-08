import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
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
  const [isLoading, setIsLoading] = useState(false);

  
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
    <div>
      <h2 className="text-3xl font-bold mb-6">Alumni Directory</h2>
      <form
        onSubmit={handleFilterSubmit}
        className="p-6 bg-white rounded-lg shadow-md mb-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
      >
        <div className="md:col-span-4">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search by Name</label>
          <input
            id="search"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="e.g., Jane Doe"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
          <input
            id="department"
            name="department"
            value={filters.department}
            onChange={handleFilterChange}
            placeholder="e.g., CSE"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="year_of_passing" className="block text-sm font-medium text-gray-700">Year of Passing</label>
          <input
            type="number"
            id="year_of_passing"
            name="year_of_passing"
            value={filters.year_of_passing}
            onChange={handleFilterChange}
            placeholder="e.g., 2022"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
          <input
            id="location"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            placeholder="e.g., Chennai"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors hover:bg-blue-700"
        >
          Apply Filters
        </button>
      </form>

    
      {isLoading ? (
        <p className="text-center">Loading alumni...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {alumni.length > 0 ? (
            alumni.map((alum) => (
              <div
                key={alum.id}
                className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold text-blue-600">{alum.name}</h3>
                <p className="text-gray-700">{alum.department} - {alum.year_of_passing}</p>
                <p className="text-gray-500 mt-2"><span className="font-medium">Location:</span> {alum.location}</p>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No alumni found matching your criteria.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default AlumniList;