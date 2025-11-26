import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import StaffDashboard from "./pages/StaffDashboard";
import ApproverDashboard from "./pages/ApproverDashboard";
import FinanceDashboard from "./pages/FinanceDashboard";
import RequestForm from "./pages/RequestForm";
import EditRequest from "./pages/EditRequest";
import ViewRequest from "./pages/ViewRequest";
import ApproverPendingRequests from "./pages/ApproverPendingRequests";
import RequestApproval from "./pages/RequestApproval";
import ApproverReviewedRequests from "./pages/ApproverReviewedRequests";
import ValidateReceipt from "./pages/ValidateReceipt";
import UploadReceipts from "./pages/UploadFile";
import RequestList from "./pages/RequestList";
import RequestDetail from "./pages/RequestDetail";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} /> 
        <Route path="/signup" element={<SignUp />} /> 

        {/* Staff routes */}
        <Route
          path="/staff/dashboard"
          element={
            <ProtectedRoute allowedRoles={["staff"]}>
              <StaffDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/request/new"
          element={
            <ProtectedRoute allowedRoles={["staff"]}>
              <RequestForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/request/edit/:id"
          element={
            <ProtectedRoute allowedRoles={["staff"]}>
              <EditRequest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/request/view/:id"
          element={
            <ProtectedRoute allowedRoles={["staff"]}>
              <ViewRequest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/requests"
          element={
            <ProtectedRoute allowedRoles={["staff"]}>
              <RequestList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/requests/:id"
          element={
            <ProtectedRoute allowedRoles={["staff"]}>
              <RequestDetail />
            </ProtectedRoute>
          }
        />

        {/* Approver routes */}
        <Route
          path="/approver/dashboard"
          element={
            <ProtectedRoute allowedRoles={["approver"]}>
              <ApproverDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/approver/pending-requests"
          element={
            <ProtectedRoute allowedRoles={["approver"]}>
              <ApproverPendingRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/approver/request-approval"
          element={
            <ProtectedRoute allowedRoles={["approver"]}>
              <RequestApproval />
            </ProtectedRoute>
          }
        />
        <Route
          path="/approver/reviewed-request"
          element={
            <ProtectedRoute allowedRoles={["approver"]}>
              <ApproverReviewedRequests />
            </ProtectedRoute>
          }
        />

        {/* Finance routes */}
        <Route
          path="/finance/dashboard"
          element={
            <ProtectedRoute allowedRoles={["finance"]}>
              <FinanceDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/finance/validate-receipt"
          element={
            <ProtectedRoute allowedRoles={["finance"]}>
              <ValidateReceipt />
            </ProtectedRoute>
          }
        />
        <Route
          path="/finance/upload-receipt"
          element={
            <ProtectedRoute allowedRoles={["finance"]}>
              <UploadReceipts />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </Router>
  );
}

export default App;
