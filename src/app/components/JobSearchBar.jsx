import React from "react";
import { Box, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const NAVY  = "#13206d";
const GREEN = "#84fba2";

export function JobSearchBar({ value, onChange }) {
  return (
    <Box
      sx={{
        bgcolor: "white",
        borderRadius: "44px",
        display: "flex",
        alignItems: "center",
        px: 3,
        py: 1,
        border: `1.5px solid ${value ? NAVY : GREEN}`,
        boxShadow: value
          ? "0 2px 12px rgba(19,32,109,0.12)"
          : "0 2px 12px rgba(132,251,162,0.18)",
        transition: "border-color 0.2s, box-shadow 0.2s",
        width: "100%",
      }}
    >
      <InputBase
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by job title or status"
        sx={{
          flex: 1,
          color: NAVY,
          fontSize: 16,
          fontFamily: "'Inter', sans-serif",
          "& input::placeholder": { color: `${NAVY}70`, opacity: 1 },
        }}
      />
      {value ? (
        <IconButton
          size="small"
          onClick={() => onChange("")}
          sx={{ color: `${NAVY}60`, p: 0.4, "&:hover": { color: NAVY } }}
        >
          <ClearIcon sx={{ fontSize: 18 }} />
        </IconButton>
      ) : (
        <SearchIcon sx={{ color: `${NAVY}55`, fontSize: 22 }} />
      )}
    </Box>
  );
}