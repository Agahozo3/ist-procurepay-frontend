import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../api/api"; // your API function
import { useNavigate } from "react-router-dom";
import UserIcon from "./UserIcon";

export default function WelcomeCard() {
  const [user, setUser] = useState({ username: "", role: "" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

 
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser({ username: data.username, role: data.role });
      } catch (err) {
        console.error("Failed to fetch user:", err);
       
        localStorage.removeItem("token");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); 
  };

  if (loading) return <p className="text-center mt-4">Loading user info...</p>;

  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <UserIcon />
      <h1 className="text-2xl font-bold mt-4">Welcome, {user.username}</h1>
      <p className="text-gray-600 mt-2">Role: {user.role}</p>
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
