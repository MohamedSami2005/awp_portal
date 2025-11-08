import axios from 'axios';

// --- BASE URL ---
const API_BASE_URL = 'http://localhost:8000/api';

// --- MOCK DATA for PUBLIC ---
let MOCK_ALUMNI = [
  { id: 1, name: 'Jane Doe', department: 'CSE', year_of_passing: 2022, location: 'Chennai' },
  { id: 2, name: 'John Smith', department: 'ECE', year_of_passing: 2021, location: 'Bangalore' },
  { id: 3, name: 'Priya Kumar', department: 'CSE', year_of_passing: 2022, location: 'Mumbai' },
];

let MOCK_ACHIEVEMENTS = [
  { id: 1, title: 'Forbes 30 Under 30', alumni_name: 'Jane Doe' },
  { id: 2, title: 'Founded successful AI startup', alumni_name: 'John Smith' },
];

const MOCK_EVENTS = [
  { id: 1, title: 'Alumni Annual Meetup 2025', date: '2025-12-15', location: 'Campus Auditorium' },
  { id: 2, title: 'Webinar: AI in Modern Tech', date: '2025-11-20', location: 'Online (Zoom)' },
];

// --- MOCK DATA for ADMIN ---
let MOCK_PENDING_ALUMNI = [
  { id: 4, name: 'Rajesh Gupta', department: 'MECH', year_of_passing: 2023, location: 'Delhi', achievements: 'Won national robotics competition.' },
  { id: 5, name: 'Aisha Khan', department: 'CSE', year_of_passing: 2022, location: 'Pune', achievements: 'Interned at Google.' },
];

// === PUBLIC API FUNCTIONS ===

export const getAlumniList = async (filters) => {
  console.log('Fetching alumni with filters:', filters);
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filteredAlumni = MOCK_ALUMNI;

  // Search by name
  if (filters?.search) {
    filteredAlumni = filteredAlumni.filter((a) =>
      a.name.toLowerCase().includes(filters.search.toLowerCase())
    );
  }

  // Filter by department
  if (filters?.department) {
    filteredAlumni = filteredAlumni.filter(
      (a) => a.department.toLowerCase() === filters.department.toLowerCase()
    );
  }
  
  // Filter by year
  if (filters?.year_of_passing) {
    filteredAlumni = filteredAlumni.filter(
      (a) => a.year_of_passing == filters.year_of_passing
    );
  }
  
  // Filter by location
  if (filters?.location) {
    filteredAlumni = filteredAlumni.filter(
      (a) => a.location.toLowerCase() === filters.location.toLowerCase()
    );
  }

  return filteredAlumni;
};

export const registerAlumni = async (alumniData) => {
  console.log('Registering alumni:', alumniData);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  const newAlum = { id: Math.random(), ...alumniData };
  MOCK_PENDING_ALUMNI.push(newAlum);
  
  return {
    message: 'Registration successful! Waiting for admin approval.',
    data: newAlum,
  };
};

export const getAchievements = async () => {
  console.log('Fetching achievements...');
  await new Promise((resolve) => setTimeout(resolve, 500));
  return MOCK_ACHIEVEMENTS;
};

export const getEvents = async () => {
  console.log('Fetching events...');
  await new Promise((resolve) => setTimeout(resolve, 500));
  return MOCK_EVENTS;
};

// === ADMIN API FUNCTIONS ===

export const adminLogin = async (username, password) => {
  console.log('Attempting admin login...');
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (username === 'admin' && password === 'admin123') {
    const mockToken = 'fake-admin-token-12345';
    localStorage.setItem('adminToken', mockToken);
    return { success: true, token: mockToken };
  } else {
    return { success: false, message: 'Invalid username or password' };
  }
};

export const getPendingAlumni = async () => {
  console.log('Fetching pending alumni...');
  await new Promise((resolve) => setTimeout(resolve, 500));
  return MOCK_PENDING_ALUMNI;
};

export const approveAlumni = async (alumniId) => {
  console.log(`Approving alumni ${alumniId}...`);
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  const approvedAlum = MOCK_PENDING_ALUMNI.find(a => a.id === alumniId);
  MOCK_PENDING_ALUMNI = MOCK_PENDING_ALUMNI.filter(a => a.id !== alumniId);
  
  if (approvedAlum) {
    MOCK_ALUMNI.push(approvedAlum);
  }
  return { success: true, message: 'Alumni approved' };
};

export const rejectAlumni = async (alumniId) => {
  console.log(`Rejecting alumni ${alumniId}...`);
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  MOCK_PENDING_ALUMNI = MOCK_PENDING_ALUMNI.filter(a => a.id !== alumniId);
  return { success: true, message: 'Alumni rejected' };
};

export const adminLogout = () => {
  localStorage.removeItem('adminToken');
};

export const getAdminStats = async () => {
  console.log('Fetching admin stats...');
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    totalAlumni: MOCK_ALUMNI.length,
    pendingApprovals: MOCK_PENDING_ALUMNI.length,
    totalAchievements: MOCK_ACHIEVEMENTS.length,
    totalEvents: MOCK_EVENTS.length,
  };
};

export const deleteAchievement = async (achievementId) => {
  console.log(`Deleting achievement ${achievementId}...`);
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  MOCK_ACHIEVEMENTS = MOCK_ACHIEVEMENTS.filter(
    (ach) => ach.id !== achievementId
  );
  return { success: true, message: 'Achievement deleted' };
};