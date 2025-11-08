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
    <div>
      <h2 className="text-3xl font-bold mb-6">Alumni Achievements</h2>
      {isLoading ? (
        <p className="text-center">Loading achievements...</p>
      ) : (
        <div className="space-y-6">
          {achievements.length > 0 ? (
            achievements.map((ach) => (
              <div 
                key={ach.id} 
                className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold">{ach.title}</h3>
                <p className="text-gray-700 mt-2">
                  - <span className="font-medium">{ach.alumni_name}</span>
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No achievements posted yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Achievements;