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
} from '../services/api';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalAlumni: 0,
    pendingApprovals: 0,
    totalAchievements: 0,
    totalEvents: 0,
  });
  const [pending, setPending] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();


  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [statsData, pendingData, achData] = await Promise.all([
        getAdminStats(),
        getPendingAlumni(),
        getAchievements(),
      ]);
      setStats(statsData);
      setPending(pendingData);
      setAchievements(achData);
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
    } else {
      fetchData();
    }
  }, [navigate]);

  const handleApprove = async (id) => {
    await approveAlumni(id);
    fetchData();
  };

  const handleReject = async (id) => {
    await rejectAlumni(id);
    fetchData();
  };

  const handleDeleteAchievement = async (id) => {
    if (window.confirm('Are you sure you want to delete this achievement?')) {
      await deleteAchievement(id);
      fetchData();
    }
  };

  const handleLogout = () => {
    adminLogout();
    navigate('/admin');
  };
  


  return (
    <div className="min-h-screen bg-blue-50 p-8">
      
     
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-900">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-5 py-2 bg-red-600 text-white rounded-lg font-semibold transition hover:bg-red-700 hover:shadow-lg"
        >
          Logout
        </button>
      </header>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fadeIn">
        <StatCard title="Total Alumni" value={stats.totalAlumni} />
        <StatCard title="Pending Approvals" value={stats.pendingApprovals} />
        <StatCard title="Achievements" value={stats.totalAchievements} />
        <StatCard title="Events" value={stats.totalEvents} />
      </div>
      
      
      <div className="space-y-8">
        
     
        <div className="bg-white p-6 rounded-lg shadow-md animate-fadeIn">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Pending Alumni Approvals</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : pending.length > 0 ? (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {pending.map((alum) => (
                <div key={alum.id} className="border p-4 rounded-md shadow-sm bg-gray-50">
                  <h3 className="text-xl font-bold">{alum.name}</h3>
                  <p className="text-gray-700">{alum.department} - {alum.year_of_passing}</p>
                  <p className="text-gray-600">Location: {alum.location}</p>
                  {alum.achievements && (
                    <p className="text-gray-600 mt-2">
                      <span className="font-semibold">Achievements:</span> {alum.achievements}
                    </p>
                  )}
                    <div className="flex gap-4 mt-4">
                      <button
                        onClick={() => handleApprove(alum.id)}
                        className="px-4 py-2 bg-green-500 text-white rounded-md transition hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(alum.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-md transition hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No pending approvals.</p>
          )}
        </div>
        
     
        <div className="bg-white p-6 rounded-lg shadow-md animate-fadeIn">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Manage Achievements</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : achievements.length > 0 ? (
            <div className="overflow-x-auto max-h-96 overflow-y-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {achievements.map((ach) => (
                    <tr key={ach.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ach.title}</td>
                      <td className="px-6 py-4 whitespace-nowGrap text-sm text-gray-500">{ach.alumni_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleDeleteAchievement(ach.id)}
                          className="text-red-600 hover:text-red-900 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No achievements posted.</p>
          )}
        </div>
      </div>
      
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <h3 className="text-sm font-medium text-gray-500 uppercase">{title}</h3>
      <p className="mt-1 text-3xl font-semibold text-blue-700">{value}</p>
    </div>
  );
}

export default AdminDashboard;