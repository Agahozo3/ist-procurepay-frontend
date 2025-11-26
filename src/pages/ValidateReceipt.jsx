import React, { useEffect, useState } from "react";
import { Check, X, Eye } from "lucide-react";
import { getRequests, approveRequest, rejectRequest } from "../api/api.jsx";

export default function ValidateReceipt() {
  const [receiptList, setReceiptList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const data = await getRequests();
      setReceiptList(data);
    } catch (err) {
      console.error("Failed to fetch requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveRequest(id);
      setReceiptList((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: "APPROVED" } : r))
      );
    } catch (err) {
      console.error("Approve error:", err);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectRequest(id);
      setReceiptList((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: "REJECTED" } : r))
      );
    } catch (err) {
      console.error("Reject error:", err);
    }
  };

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Loading requests...</div>;
  }

  return (
    <div className="p-6 min-h-screen bg-blue-100">
      <h1 className="text-2xl font-bold mb-6 text-center">Validate Receipts</h1>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-200 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="py-3 px-2">Request</th>
              <th className="py-3 px-2">Amount</th>
              <th className="py-3 px-2">Submitted By</th>
              <th className="py-3 px-2">Receipt</th>
              <th className="py-3 px-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {receiptList.map((r) => (
              <tr key={r.id} className="border-b">
                <td className="py-3 px-2">{r.title}</td>
                <td className="py-3 px-2">${r.amount}</td>
                <td className="py-3 px-2">{r.submitted_by}</td>
                <td className="py-3 px-2">
                  {r.receipt ? (
                    <a
                      href={`http://localhost:8000${r.receipt}`}
                      className="text-blue-600 underline hover:text-blue-800"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Receipt
                    </a>
                  ) : (
                    <span className="text-gray-400">Not uploaded</span>
                  )}
                </td>
                <td className="py-3 px-2 flex gap-3">
                  {r.receipt && r.status !== "APPROVED" && (
                    <>
                      <button
                        className="text-green-600 flex items-center gap-1"
                        onClick={() => handleApprove(r.id)}
                      >
                        <Check size={18} /> Approve
                      </button>
                      <button
                        className="text-red-600 flex items-center gap-1"
                        onClick={() => handleReject(r.id)}
                      >
                        <X size={18} /> Reject
                      </button>
                    </>
                  )}
                  {r.receipt && (
                    <button className="text-blue-600 flex items-center gap-1">
                      <Eye size={18} /> View
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
