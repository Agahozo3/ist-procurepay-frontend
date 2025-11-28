import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  const token = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user") || '{}');

  console.log('PROTECTED - Auth user:', user);
  console.log('PROTECTED - Stored user:', storedUser);
  console.log('PROTECTED - Token exists:', !!token);
  console.log('PROTECTED - Allowed roles:', allowedRoles);
  console.log('PROTECTED - User role:', user?.role || storedUser?.role);

  // Not logged in → redirect to login
  if (!token) {
    console.log('PROTECTED - No token, redirecting to login');
    return <Navigate to="/" replace />;
  }

  const currentUser = user || storedUser;
  if (!currentUser || !currentUser.role) {
    console.log('PROTECTED - No user data, redirecting to login');
    return <Navigate to="/" replace />;
  }

  // Role-based protection
  if (allowedRoles && !allowedRoles.includes(currentUser.role?.toLowerCase())) {
    console.log('PROTECTED - Role not allowed, redirecting to login');
    return <Navigate to="/" replace />;
  }

  console.log('PROTECTED - Access granted');
  return children;
}
