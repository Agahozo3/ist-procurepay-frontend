import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function ApproverRequestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);

  useEffect(() => {
    setRequest({
      id,
      title: "Laptop Purchase",
      description: "Purchase a new office laptop for development team",
      amount: 1200,
      status: "PENDING",
      proforma: "laptop_proforma.pdf",
      createdAt: "2025-11-23",
      createdBy: "John Doe",
      approvals: [
        { level: 1, approver: "Manager 1", status: "APPROVED" },
        { level: 2, approver: "Manager 2", status: "PENDING" },
      ],
    });
  }, [id]);

  const handleApprove = () => {
    console.log("Approve request:", request.id);
    setRequest({ ...request, status: "APPROVED" });
  };

  const handleReject = () => {
    console.log("Reject request:", request.id);
    setRequest({ ...request, status: "REJECTED" });
  };

  if (!request) return <p className="text-center mt-6">Loading request...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-blue-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Request Details</h2>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <p><strong>Title:</strong> {request.title}</p>
        <p><strong>Description:</strong> {request.description}</p>
        <p><strong>Amount:</strong> ${request.amount}</p>
        <p><strong>Proforma:</strong> <span className="italic">{request.proforma}</span></p>
        <p><strong>Created By:</strong> {request.createdBy}</p>
        <p><strong>Created At:</strong> {request.createdAt}</p>
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
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row gap-4 justify-center">
        {request.status === "PENDING" && (
          <>
            <Button className="bg-green-500 hover:bg-green-600 w-full sm:w-auto" onClick={handleApprove}>
              Approve
            </Button>
            <Button className="bg-red-500 hover:bg-red-600 w-full sm:w-auto" onClick={handleReject}>
              Reject
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
