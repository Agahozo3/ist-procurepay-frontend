import axios from "axios";

// ===== BASE API CONFIG =====
const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

// Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// ===== Auth API =====
export const login = async (data) =>
  (await API.post("/user/auth/login/", data)).data;
export const signup = async (data) =>
  (await API.post("/user/auth/signup/", data)).data;
export const getCurrentUser = async () =>
  (await API.get("/user/auth/me/")).data;

// ===== Requests API =====
export const createRequest = async (formData) =>
  (
    await API.post("/requests/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  ).data;

export const updateRequest = async (id, data) =>
  (await API.put(`/requests/${id}/`, data)).data;

export const getRequests = async () => (await API.get("/requests/")).data;
export const getRequest = async (id) => (await API.get(`/requests/${id}/`)).data;


export const getFilteredRequests = async (status) =>
  (await API.get(`/requests/filtered/?status=${status}`)).data;

export const getPendingRequests = async () =>
  await getFilteredRequests("PENDING");

// ===== Approve / Reject Requests =====
export const approveRequest = async (id) =>
  (await API.patch(`/requests/${id}/approve/`)).data;
export const rejectRequest = async (id) =>
  (await API.patch(`/requests/${id}/reject/`)).data;

// ===== Upload Receipt =====
export const uploadReceipt = async (requestId, file) => {
  const formData = new FormData();
  formData.append("receipt", file);

  const res = await API.patch(`/requests/${requestId}/submit-receipt/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
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
