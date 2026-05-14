import React from "react";

export function ApplicationFilters({ activeFilter, onFilterChange }) {
  const filters = ["All Applications", "Pending", "Accepted", "Rejected"];

  return (
    <div className="flex items-center gap-4 mt-6 mb-8 flex-wrap">
      <span className="text-blue-900 font-bold mr-2">Filter By:</span>
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
            activeFilter === filter
              ? "bg-[#84fba2] text-[#13206d] shadow-md"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
