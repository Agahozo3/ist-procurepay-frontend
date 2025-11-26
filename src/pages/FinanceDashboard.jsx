import React from "react";
import { useNavigate } from "react-router-dom";
import WelcomeCard from "../components/WelcomeCard";

export default function FinanceDashboard({ user, onLogout }) {
  const navigate = useNavigate();
  const currentUser = user || { username: "Finance User", role: "Finance" };

  return (
    <div className="p-8 min-h-screen bg-blue-100">
    <WelcomeCard username={currentUser.username} role={currentUser.role} />
      <div className="flex flex-col items-center">
        {onLogout && (
          <button
            onClick={onLogout}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}

        <div className="mt-6 flex flex-col md:flex-row gap-6 justify-center">
          <button
            className="bg-white shadow-md px-10 py-5 text-lg rounded-xl border border-blue-300 hover:bg-blue-50"
            onClick={() => navigate("/approver/reviewed-request")}
          >
            Approved Requests
          </button>

          <button
            className="bg-white shadow-md px-10 py-5 text-lg rounded-xl border border-blue-300 hover:bg-blue-50"
            onClick={() => navigate("/finance/upload-receipt")}
          >
            Upload Receipts
          </button>
        </div>
      </div>
    </div>
  );
}
