import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/Button";

const RequestDetail = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);

  useEffect(() => {
    setRequest({
      id,
      title: "Laptop Purchase",
      description: "Purchase a new office laptop for development team",
      amount: 1200,
      status: "PENDING",
      createdBy: "John Doe",
      createdAt: "2025-11-23",
      approvals: [
        { level: 1, approver: "Manager 1", status: "APPROVED" },
        { level: 2, approver: "Manager 2", status: "PENDING" },
      ],
    });
  }, [id]);

  if (!request) return <p className="text-center mt-6">Loading request details...</p>;

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center sm:text-left">Request Details</h2>
      <div className="bg-white shadow rounded p-4 sm:p-6 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <p><strong>ID:</strong> {request.id}</p>
          <p><strong>Title:</strong> {request.title}</p>
          <p><strong>Description:</strong> {request.description}</p>
          <p><strong>Amount:</strong> ${request.amount}</p>
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
          <p><strong>Created By:</strong> {request.createdBy}</p>
          <p><strong>Created At:</strong> {request.createdAt}</p>
        </div>
      </div>
      <div className="bg-white shadow rounded p-4 sm:p-6 mb-6">
        <h3 className="text-lg sm:text-xl font-semibold mb-2">Approval History</h3>
        <ul className="space-y-2">
          {request.approvals.map((a, idx) => (
            <li key={idx} className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
              <span>Level {a.level}: {a.approver}</span>
              <span
                className={`mt-1 sm:mt-0 px-2 py-1 rounded-full text-white ${
                  a.status === "PENDING"
                    ? "bg-yellow-500"
                    : a.status === "APPROVED"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              >
                {a.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        {request.status === "PENDING" && (
          <>
            <Button className="bg-green-500 hover:bg-green-600 w-full sm:w-auto px-6">Approve</Button>
            <Button className="bg-red-500 hover:bg-red-600 w-full sm:w-auto px-6">Reject</Button>
          </>
        )}
        {request.status === "APPROVED" && (
          <Button className="bg-blue-500 hover:bg-blue-600 w-full sm:w-auto px-6">Submit Receipt</Button>
        )}
      </div>
    </div>
  );
};

export default RequestDetail;
