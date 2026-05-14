import React from "react";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const NAVY = "#13206d";

export function SearchBar({ value, onChange }) {
  return (
    <div className="w-full max-w-4xl mx-auto relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by job title, company or status"
        className="w-full bg-white rounded-full py-4 pl-6 pr-12 text-gray-700 shadow-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
        <IconButton size="small" sx={{ color: NAVY, opacity: 0.6 }}>
        <SearchIcon />
      </IconButton>
      </div>
    </div>
  );
}
