import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import App from './App';
import './index.css';


import HomePage from './pages/HomePage';
import AlumniList from './pages/AlumniList';
import AlumniRegistration from './pages/AlumniRegistration';
import Achievements from './pages/Achievements';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, 
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/alumni-list', element: <AlumniList /> },
      { path: '/register', element: <AlumniRegistration /> },
      { path: '/achievements', element: <Achievements /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLogin />, 
  },
  {
    path: '/admin/dashboard',
    element: <AdminDashboard />, 
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);