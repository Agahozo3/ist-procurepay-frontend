import React, { useEffect, useState } from "react";
import { getReviewedRequests } from "../api/api";
import Pagination from "../components/pagination"; 

export default function ApproverReviewedRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  useEffect(() => {
    const fetchReviewedRequests = async () => {
      try {
        const data = await getReviewedRequests();
        setRequests(data);
      } catch (err) {
        console.error("Failed to fetch reviewed requests:", err);
        setError("Failed to load reviewed requests.");
      }
      setLoading(false);
    };

    fetchReviewedRequests();
  }, []);

  // Pagination logic
  const indexOfLast = currentPage * entriesPerPage;
  const indexOfFirst = indexOfLast - entriesPerPage;
  const currentRequests = requests.slice(indexOfFirst, indexOfLast);

  if (loading)
    return <p className="text-center mt-4">Loading reviewed requests...</p>;
  if (error)
    return <p className="text-center mt-4 text-red-500">{error}</p>;

  return (
    <div className="p-6 min-h-screen bg-blue-50">
      <h2 className="text-2xl font-bold mb-6 text-center">Reviewed Requests</h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-600">No reviewed requests yet.</p>
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
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Purchase Order</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Created By</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Created At</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {currentRequests.map((req) => (
                <tr key={req.id}>
                  <td className="px-4 py-2">{req.title}</td>
                  <td className="px-4 py-2">{req.description}</td>
                  <td className="px-4 py-2">${req.amount}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-white ${
                        req.status === "APPROVED" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {req.proforma ? (
                      <a
                        href={req.proforma}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View Proforma
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {req.purchase_order ? (
                      <a
                        href={req.purchase_order}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View PO
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-4 py-2">{req.created_by}</td>
                  <td className="px-4 py-2">{new Date(req.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Component */}
          {requests.length > entriesPerPage && (
            <Pagination
              entriesPerPage={entriesPerPage}
              totalEntries={requests.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      )}
    </div>
  );
}
