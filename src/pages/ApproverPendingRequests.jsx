import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { getPendingRequests, approveRequest, rejectRequest } from "../api/api";

export default function ApproverPendingApproval() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getPendingRequests();
        setRequests(data);
      } catch (err) {
        console.error("Error fetching pending requests:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveRequest(id);
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: "APPROVED" } : r))
      );
    } catch (err) {
      console.error("Failed to approve request:", err);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectRequest(id);
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: "REJECTED" } : r))
      );
    } catch (err) {
      console.error("Failed to reject request:", err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading requests...</p>;

  return (
    <div className="p-6 min-h-screen bg-blue-50">
      <h2 className="text-2xl font-bold mb-6 text-center">Pending Requests for Approval</h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-600">No pending requests</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Title</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Description</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Amount</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Proforma</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Created By</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Created At</th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {requests.map((req) => (
                <tr key={req.id}>
                  <td className="px-4 py-2">{req.title}</td>
                  <td className="px-4 py-2">{req.description}</td>
                  <td className="px-4 py-2">${req.amount}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-white ${
                        req.status === "PENDING"
                          ? "bg-yellow-500"
                          : req.status === "APPROVED"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {req.proforma ? (
                      <a
                        href={req.proforma.startsWith("http") ? req.proforma : `/${req.proforma}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        {req.proforma.split("/").pop()}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-4 py-2">{req.created_by}</td>
                  <td className="px-4 py-2">{new Date(req.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-2 flex gap-2 justify-center">
                    {req.status === "PENDING" && (
                      <>
                        <Button
                          className="bg-green-500 hover:bg-green-600 px-3 py-1 text-sm"
                          onClick={() => handleApprove(req.id)}
                        >
                          Approve
                        </Button>
                        <Button
                          className="bg-red-500 hover:bg-red-600 px-3 py-1 text-sm"
                          onClick={() => handleReject(req.id)}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
