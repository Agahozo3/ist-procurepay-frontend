import React, { useEffect, useState } from "react";
import { getFilteredRequests, uploadReceipt } from "../api/api.jsx";

export default function UploadFile() {
  const [requests, setRequests] = useState([]);
  const [uploadingId, setUploadingId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false); 


  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getFilteredRequests("APPROVED");
        setRequests(data);
      } catch (err) {
        console.error("Failed to fetch approved requests:", err);
        setError("Failed to load requests.");
      }
      setLoading(false);
    };
    fetchRequests();
  }, []);

  
  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);
  const handleUpload = async (id) => {
    if (!selectedFile) return alert("Please select a file first");

    setUploading(true);

    try {
      const data = await uploadReceipt(id, selectedFile);
      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, receipt: data.receipt } : req))
      );
      alert("Receipt uploaded successfully!");
      setUploadingId(null);
      setSelectedFile(null);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload receipt. Please try again.");
    }

    setUploading(false);
  };

  if (loading) return <p className="text-center mt-4">Loading requests...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;

  return (
    <div className="p-6 min-h-screen bg-blue-50">
      <h1 className="text-2xl font-bold mb-6 text-center">Upload Receipts</h1>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-200 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Title</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Amount</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Proforma</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Purchase Order</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Receipt</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Created By</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Created At</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {requests.map((req) => (
              <tr key={req.id}>
                <td className="px-4 py-2">{req.title}</td>
                <td className="px-4 py-2">${req.amount}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-white ${
                      req.status === "APPROVED" ? "bg-green-500" : "bg-gray-500"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {req.proforma ? (
                    <a
                      href={`http://localhost:8000${req.proforma}`}
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
                      href={`http://localhost:8000${req.purchase_order}`}
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
                <td className="px-4 py-2">
                  {req.receipt ? (
                    <a
                      href={`http://localhost:8000${req.receipt}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Receipt
                    </a>
                  ) : uploadingId === req.id ? (
                    <input type="file" onChange={handleFileChange} />
                  ) : (
                    "-"
                  )}
                </td>

                <td className="px-4 py-2">{req.created_by}</td>
                <td className="px-4 py-2">{new Date(req.created_at).toLocaleDateString()}</td>
                <td className="px-4 py-2">
                  {!req.receipt && (
                    <>
                      {uploadingId === req.id ? (
                        <button
                          className={`px-3 py-1 rounded text-white ${
                            uploading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500"
                          }`}
                          onClick={() => handleUpload(req.id)}
                          disabled={uploading}
                        >
                          {uploading ? "Uploading..." : "Upload"}
                        </button>
                      ) : (
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded"
                          onClick={() => setUploadingId(req.id)}
                        >
                          Select File
                        </button>
                      )}
                    </>
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
