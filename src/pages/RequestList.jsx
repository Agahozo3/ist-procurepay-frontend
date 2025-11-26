import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Edit } from "lucide-react";
import { getRequests } from "../api/api";
import Pagination from "../components/pagination"; 

export default function RequestList({ user }) {
  const navigate = useNavigate();
  const currentUser = user || { username: "Staff User", role: "Staff" };

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getRequests(); 
        const formatted = data.map((r) => ({
          id: r.id,
          title: r.title,
          description: r.description,
          amount: r.amount,
          status: r.status,
          proforma: r.proforma,
          createdBy: r.created_by,
          createdAt: r.created_at,
        }));
        setRequests(formatted);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch requests. Please try again.");
      }
      setLoading(false);
    };
    fetchRequests();
  }, []);

  const handleEdit = (id) => navigate(`/request/edit/${id}`);
  const handleView = (id) => navigate(`/request/view/${id}`);

  const indexOfLast = currentPage * entriesPerPage;
  const indexOfFirst = indexOfLast - entriesPerPage;
  const currentRequests = requests.slice(indexOfFirst, indexOfLast);

  return (
    <div className="p-6 min-h-screen bg-blue-50">
      <h1 className="text-2xl font-bold mb-6 text-center">My Requests</h1>

      {loading && <p className="text-center text-gray-600 mb-4">Loading requests...</p>}
      {error && <p className="text-center text-red-500 mb-4">{error}</p>}

      <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-200 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-sm font-semibold text-gray-700">Title</th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-700">Description</th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-700">Amount</th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-700">Status</th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-700">Proforma</th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-700">Created By</th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-700">Created At</th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-700 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {currentRequests.map((r) => (
              <tr key={r.id}>
                <td className="px-4 py-2">{r.title}</td>
                <td className="px-4 py-2">{r.description}</td>
                <td className="px-4 py-2">{r.amount}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-white ${
                      r.status === "PENDING"
                        ? "bg-yellow-500"
                        : r.status === "APPROVED"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {r.proforma ? (
                    <a
                      href={r.proforma.startsWith("http") ? r.proforma : `/${r.proforma}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      {r.proforma.split("/").pop()}
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-4 py-2">{r.createdBy || "-"}</td>
                <td className="px-4 py-2">
                  {r.createdAt ? new Date(r.createdAt).toLocaleString() : "-"}
                </td>
                <td className="px-4 py-2 flex justify-center gap-2">
                  {r.status === "PENDING" && (
                    <button
                      className="text-orange-600 flex items-center gap-1"
                      onClick={() => handleEdit(r.id)}
                    >
                      <Edit size={16} /> Edit
                    </button>
                  )}
                  <button
                    className="text-blue-600 flex items-center gap-1"
                    onClick={() => handleView(r.id)}
                  >
                    <Eye size={16} /> View
                  </button>
                </td>
              </tr>
            ))}

            {!loading && requests.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500">
                  No requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {requests.length > entriesPerPage && (
          <Pagination
            entriesPerPage={entriesPerPage}
            totalEntries={requests.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}
