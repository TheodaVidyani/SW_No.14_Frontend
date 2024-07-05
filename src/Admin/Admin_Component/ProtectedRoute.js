// ProtectedRoute.js
// src/Admin/Admin_component/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from './UserContext';
import CircularProgress from '@mui/material/CircularProgress'; // Material-UI loading indicator

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, isReady } = useUser();
  
  // Log the user and the roles
  console.log('ProtectedRoute - User:', user);
  console.log('ProtectedRoute - User role:', user?.role);
  console.log('ProtectedRoute - Allowed roles:', allowedRoles);

  if (!isReady) {
    console.log('ProtectedRoute - Checking authentication status...');
    return <CircularProgress />; // Display a loading indicator while checking authentication
  }

  // If user is not available, redirect to home
  if (user == null) {
    console.log('ProtectedRoute - No user, redirecting to home');
    return <Navigate to="/" replace />;
  }
  
  // If user role is not allowed, redirect to home
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    console.log('ProtectedRoute - User role not allowed, redirecting to home');
    return <Navigate to="/" replace />;
  }

  // If user is authenticated and has the correct role, render the child routes
  console.log('ProtectedRoute - User authenticated and has correct role, rendering child routes');
  return <Outlet />;
};

export default ProtectedRoute;
