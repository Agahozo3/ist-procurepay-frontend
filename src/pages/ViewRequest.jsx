import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { getRequest } from "../api/api";

export default function ViewRequest() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequest = async () => {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      if (!token) {
        setError("You are not authorized. Please log in.");
        setLoading(false);
        return;
      }

      if (!id) {
        setError("Invalid request ID.");
        setLoading(false);
        return;
      }

      try {
        const data = await getRequest(id);
        setRequest(data);
      } catch (err) {
        console.error("Axios error:", err.response || err);
        if (err.response) {
          if (err.response.status === 401) {
            setError("Unauthorized. Please log in again.");
            navigate("/login");
          } else if (err.response.status === 404) {
            setError("Request not found.");
          } else {
            setError(err.response.data?.detail || "Failed to load request.");
          }
        } else {
          setError("Network error. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [id, navigate]);

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading request details...</p>;

  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
          Request Details #{request.id}
        </h2>

        <div className="space-y-4">
          <p>
            <strong>Title:</strong> {request.title}
          </p>
          <p>
            <strong>Description:</strong> {request.description}
          </p>
          <p>
            <strong>Amount:</strong> ${request.amount}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`px-2 py-1 rounded-full text-white ${
                request.status === "PENDING"
                  ? "bg-yellow-500"
                  : request.status === "APPROVED"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {request.status}
            </span>
          </p>
          <p>
            <strong>Proforma:</strong>{" "}
            {request.proforma ? (
              <a
                href={
                  request.proforma.startsWith("http")
                    ? request.proforma
                    : `/${request.proforma}`
                }
                className="text-blue-600 underline hover:text-blue-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                {request.proforma.split("/").pop()}
              </a>
            ) : (
              "-"
            )}
          </p>
          <p>
            <strong>Created By:</strong> {request.createdBy}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(request.createdAt).toLocaleDateString()}
          </p>
        </div>

        <Button
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium py-3 rounded-lg shadow-md transition"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </div>
    </div>
  );
}
