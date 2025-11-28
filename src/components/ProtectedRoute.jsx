import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  // Not logged in → redirect to login
  if (!user || !token) {
    return <Navigate to="/" replace />;
  }

  // Role-based protection
  if (allowedRoles && !allowedRoles.includes(user.role?.toLowerCase())) {
    return <Navigate to="/" replace />;
  }

  return children;
}
