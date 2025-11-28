import React from "react";
import { useNavigate } from "react-router-dom";
import UserIcon from "./UserIcon";

export default function WelcomeCard({ username, role }) {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/"); 
  };

  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <UserIcon />
      <h1 className="text-2xl font-bold mt-4">Welcome, {username}</h1>
      <p className="text-gray-600 mt-2">Role: {role}</p>
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
