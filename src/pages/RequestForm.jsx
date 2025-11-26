import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { createRequest } from "../api/api";

export default function RequestForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [proformaFile, setProformaFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setProformaFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("amount", amount);
      if (proformaFile) formData.append("proforma", proformaFile);

      await createRequest(formData);
      setSuccess("Request created successfully!");

      setTitle("");
      setDescription("");
      setAmount("");
      setProformaFile(null);
      setTimeout(() => {
        navigate("/staff/dashboard");
      }, 2000);
    } catch (err) {
      console.error(err);
      setError("Failed to create request. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
          Create Purchase Request
        </h2>

        {error && <p className="text-center text-red-500 mb-4">{error}</p>}
        {success && <p className="text-center text-green-600 mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Purchase Request Title"
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Total Amount in USD"
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the purpose of this purchase"
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Upload Proforma / Quotation
            </label>

            <div className="flex items-center gap-4">
              <label
                htmlFor="proforma-upload"
                className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Choose File
              </label>
              {proformaFile && <span className="text-gray-700 italic">{proformaFile.name}</span>}
            </div>

            <input
              id="proforma-upload"
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.png"
              className="hidden"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium py-3 rounded-lg shadow-md transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Request"}
          </Button>
        </form>
      </div>
    </div>
  );
}
