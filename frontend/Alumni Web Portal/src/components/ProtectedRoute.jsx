import React from 'react';
import { Navigate } from 'react-router-dom';

// This component wraps around pages you want to protect
const ProtectedRoute = ({ children }) => {
  // 1. Check if the token exists
  const token = localStorage.getItem('adminToken');

  // 2. If no token, redirect immediately to Admin Login
  if (!token) {
    return <Navigate to="/admin" replace />;
  }

  // 3. If token exists, allow access to the page (children)
  return children;
};

export default ProtectedRoute;