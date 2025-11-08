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
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    try {
      const res = await registerAlumni(formData);
      setMessage(res.message);
      setFormData({
        name: '',
        department: '',
        year_of_passing: '',
        location: '',
        achievements: '',
      });
    } catch (error) {
      setMessage('Registration failed. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Alumni Registration</h2>
      {message && (
        <div
          className={`p-4 mb-4 rounded-md ${
            message.includes('failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}
        >
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <input
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              placeholder="e.g., CSE, ECE"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="year_of_passing" className="block text-sm font-medium text-gray-700">
              Year of Passing
            </label>
            <input
              type="number"
              id="year_of_passing"
              name="year_of_passing"
              value={formData.year_of_passing}
              onChange={handleChange}
              required
              placeholder="e.g., 2022"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Current Location (City)
          </label>
          <input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="e.g., Chennai"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="achievements" className="block text-sm font-medium text-gray-700">
            Achievements (Optional)
          </label>
          <textarea
            id="achievements"
            name="achievements"
            rows="3"
            value={formData.achievements}
            onChange={handleChange}
            placeholder="Share any achievements or success stories."
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <button
            disabled={isLoading}
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
          >
            {isLoading ? 'Submitting...' : 'Register'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AlumniRegistration;