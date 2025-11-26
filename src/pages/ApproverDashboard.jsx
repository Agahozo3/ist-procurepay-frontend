import React from "react";
import { useNavigate } from "react-router-dom";
import WelcomeCard from "../components/WelcomeCard";
import Button from "../components/Button";

export default function ApproverDashboard({ user, onLogout }) {
  const navigate = useNavigate();
  const currentUser = user || { username: "John Doe", role: "Approver" };

  return (
    <div className="p-6 min-h-screen bg-blue-100">
      <WelcomeCard
        username={currentUser.username}
        role={currentUser.role}
    />
      {onLogout && (
        <button
          onClick={onLogout}
          className="mt-6 bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600"
        >
          Logout
        </button>
      )}
          <div className="mt-6 flex justify-center gap-4">
   <div className="mt-6 flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <Button
          className="bg-green-500 hover:bg-green-600"
          onClick={() => navigate("/approver/pending-requests")}
        >
          Pending Approval
        </Button>

        <Button
          className="bg-blue-500 hover:bg-blue-600"
          onClick={() => navigate("/approver/reviewed-request")}
        >
          Reviewed Requests
        </Button>
      </div>
    </div>
    </div>
  );
}
