import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/");

    const user = JSON.parse(localStorage.getItem("user")); // store user on login
    if (!user || !user.role) return navigate("/");

    const roleRoutes = {
      staff: "/staff/dashboard",
      approver: "/approver/dashboard",
      finance: "/finance/dashboard",
    };

    navigate(roleRoutes[user.role.toLowerCase()] || "/");
  }, [navigate]);

  return null;
}
