import axios from "axios";

// ===== BASE API CONFIG =====
const API = axios.create({
  baseURL: "https://ist-procurepay-backend-1.onrender.com/api",
});

// Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// Handle token expiration
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

// ===== Auth API =====
export const login = async (data) => {
  const response = await API.post("/user/auth/login/", data);
  return response.data;
};

export const signup = async (data) => {
  const response = await API.post("/user/auth/signup/", data);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await API.get("/user/auth/me/");
  return response.data;
};

// ===== Requests API =====
export const createRequest = async (formData) => {
  const response = await API.post("/requests/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateRequest = async (id, data) => {
  const response = await API.put(`/requests/${id}/`, data);
  return response.data;
};

export const getRequests = async () => {
  const response = await API.get("/requests/");
  return response.data;
};

export const getRequest = async (id) => {
  const response = await API.get(`/requests/${id}/`);
  return response.data;
};

export const getFilteredRequests = async (status) => {
  const response = await API.get(`/requests/filtered/?status=${status}`);
  return response.data;
};

export const getPendingRequests = async () => {
  return getFilteredRequests("PENDING");
};

// ===== Approve / Reject Requests =====
export const approveRequest = async (id) => {
  const response = await API.patch(`/requests/${id}/approve/`);
  return response.data;
};

export const rejectRequest = async (id) => {
  const response = await API.patch(`/requests/${id}/reject/`);
  return response.data;
};

// ===== Upload Receipt =====
export const uploadReceipt = async (requestId, file) => {
  const formData = new FormData();
  formData.append("receipt", file);

  const response = await API.patch(
    `/requests/${requestId}/submit-receipt/`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  return response.data;
};

// ===== Reviewed Requests =====
export const getReviewedRequests = async () => {
  try {
    const response = await API.get("/requests/reviewed/");
    return response.data;
  } catch (error) {
    console.error("Error fetching reviewed requests:", error);
    throw error;
  }
};
