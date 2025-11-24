import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';

// Import Pages
import HomePage from './pages/HomePage';
import AlumniList from './pages/AlumniList';
import AlumniRegistration from './pages/AlumniRegistration';
import Achievements from './pages/Achievements';
import EventsPage from './pages/EventsPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// --- FIX: IMPORT THE MISSING PAGE HERE ---
import AlumniProfile from './pages/AlumniProfile';

// Import Security Component
import ProtectedRoute from './components/ProtectedRoute'; 

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/alumni-list', element: <AlumniList /> },
      { path: '/register', element: <AlumniRegistration /> },
      { path: '/achievements', element: <Achievements /> },
      { path: '/events', element: <EventsPage /> },
      
      // --- THIS ROUTE NEEDS THE IMPORT ABOVE ---
      { path: '/alumni/:id', element: <AlumniProfile /> }, 
    ],
  },
  {
    path: '/admin',
    element: <AdminLogin />,
  },
  {
    path: '/admin/dashboard',
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);