import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import { updateRequest, getRequest } from "../api/api";

export default function EditRequest() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [proformaFile, setProformaFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const data = await getRequest(id);
        setTitle(data.title);
        setDescription(data.description);
        setAmount(data.amount);
        setProformaFile(data.proforma || null);
      } catch (err) {
        console.error(err);
        setError("Failed to load request details.");
      }
    };
    fetchRequest();
  }, [id]);

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
      formData.append("amount", Number(amount));

      if (proformaFile instanceof File) {
        formData.append("proforma", proformaFile);
      }

      await updateRequest(id, formData);

      setSuccess("Request updated successfully!");
      setTimeout(() => {
        navigate("/requests");
      }, 1500);

    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.detail || "Failed to update request. Please check your inputs.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
          Edit Request #{id}
        </h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {success && <p className="text-green-600 mb-4 text-center">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
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
              {proformaFile && (
                <span className="text-gray-700 italic">
                  {proformaFile instanceof File ? proformaFile.name : proformaFile}
                </span>
              )}
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
            {loading ? "Saving Changes..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </div>
  );
}
