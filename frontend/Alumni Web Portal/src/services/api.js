import axios from 'axios';

// Point this to your Django Server URL
const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically add the Admin Token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// === PUBLIC API FUNCTIONS ===

export const getAlumniList = async (filters) => {
  try {
    const response = await api.get('/alumni/list/', { params: filters });
    return response.data;
  } catch (error) {
    console.error("Error fetching alumni:", error);
    return [];
  }
};

export const registerAlumni = async (alumniData) => {
  try {
    // We use 'multipart/form-data' because we might be uploading an image
    const response = await api.post('/alumni/register/', alumniData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};

export const getAchievements = async () => {
  try {
    const response = await api.get('/achievements/');
    return response.data;
  } catch (error) {
    console.error("Error fetching achievements:", error);
    return [];
  }
};

export const getEvents = async () => {
  try {
    const response = await api.get('/events/');
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

// === ADMIN API FUNCTIONS ===

export const adminLogin = async (username, password) => {
  try {
    const response = await api.post('/admin-login/', { username, password });
    if (response.data.success) {
      localStorage.setItem('adminToken', response.data.token);
    }
    return response.data;
  } catch (error) {
    return { success: false, message: "Server error during login" };
  }
};

export const getPendingAlumni = async () => {
  try {
    const response = await api.get('/alumni/pending/');
    return response.data;
  } catch (error) {
    console.error("Error fetching pending alumni:", error);
    return [];
  }
};

export const approveAlumni = async (alumniId) => {
  try {
    const response = await api.post(`/alumni/approve/${alumniId}/`);
    return response.data;
  } catch (error) {
    console.error("Error approving alumni:", error);
  }
};

export const rejectAlumni = async (alumniId) => {
  try {
    const response = await api.post(`/alumni/reject/${alumniId}/`);
    return response.data;
  } catch (error) {
    console.error("Error rejecting alumni:", error);
  }
};

export const deleteAchievement = async (achievementId) => {
  try {
    const response = await api.delete(`/achievements/delete/${achievementId}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting achievement:", error);
  }
};

export const getAdminStats = async () => {
  try {
    const response = await api.get('/admin/stats/');
    return response.data;
  } catch (error) {
    console.error("Error fetching stats:", error);
    return { totalAlumni: 0, pendingApprovals: 0, totalAchievements: 0, totalEvents: 0 };
  }
};

export const adminLogout = () => {
  localStorage.removeItem('adminToken');
};
// ... inside src/services/api.js

// --- ADD THESE TO THE ADMIN SECTION ---

export const createEvent = async (eventData) => {
  try {
    // We use FormData because events have images (banners)
    const response = await api.post('/events/create/', eventData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const response = await api.delete(`/events/delete/${eventId}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting event:", error);
  }
};


export const createAchievement = async (data) => {
  try {
    const response = await api.post('/achievements/create/', data);
    return response.data;
  } catch (error) {
    console.error("Error creating achievement:", error);
    throw error;
  }
};
// ... inside src/services/api.js

export const getAlumniById = async (id) => {
  try {
    const response = await api.get(`/alumni/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching alumni detail:", error);
    throw error;
  }
};