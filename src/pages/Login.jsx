import React, { useState } from "react";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { login as apiLogin } from "../api/api";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await apiLogin(form); 

      if (!res.token) throw new Error("Token not received from server");
      localStorage.setItem("token", res.token);
      const role = res.user.role.toLowerCase();
      switch (role) {
        case "staff":
          navigate("/staff/dashboard");
          break;
        case "approver":
          navigate("/approver/dashboard");
          break;
        case "finance":
          navigate("/finance/dashboard");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.detail || err.message || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-blue-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-blue-200">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full border-2 border-blue-400 p-1 bg-white flex items-center justify-center">
            <User className="w-16 h-16 text-blue-400" />
          </div>
        </div>

        <h2 className="text-center text-2xl font-semibold text-blue-400 mb-8">
          Welcome Back
        </h2>

        {error && <p className="mb-4 text-center text-red-500 font-medium">{error}</p>}

        <div className="mb-5">
          <label className="block mb-1 text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Enter your password"
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-400 hover:bg-blue-500 text-white text-lg font-medium py-3 rounded-lg shadow-md transition mb-4 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "LOGIN"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-400 font-medium cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
