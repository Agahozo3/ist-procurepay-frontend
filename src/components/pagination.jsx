import React from "react";

export default function Pagination({ entriesPerPage, totalEntries, currentPage, setCurrentPage }) {
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  if (totalPages === 1) return null;

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-end mt-4 space-x-2">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => setCurrentPage(number)}
          className={`px-3 py-1 rounded-md border ${
            currentPage === number
              ? "bg-red-500 text-white border-red-500"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          {number}
        </button>
      ))}
    </div>
  );
}
