import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">Oops! Page not found.</p>
      <p className="text-gray-500 mb-6 text-center">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/">
        <Button className="w-auto px-6 py-3">Go to Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
