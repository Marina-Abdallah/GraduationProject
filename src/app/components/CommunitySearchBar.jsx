import React from "react";
import { Box, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const NAVY = "#13206d";
const GREEN = "#84fba2";

export function CommunitySearchBar({ value, onChange }) {
  return (
    <Box
      sx={{
        bgcolor: "white",
        borderRadius: "44px",
        display: "flex",
        alignItems: "center",
        px: 2.5,
        py: 0.5,
        border: `1.5px solid ${value ? NAVY : GREEN}`,
        boxShadow: value
          ? "0 2px 12px rgba(19,32,109,0.12)"
          : "0 2px 8px rgba(132,251,162,0.18)",
        transition: "border-color 0.2s, box-shadow 0.2s",
        width: "100%",
      }}
    >
      <SearchIcon sx={{ color: value ? NAVY : `${NAVY}55`, fontSize: 20, mr: 1, flexShrink: 0 }} />
      <InputBase
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search posts, people, companies…"
        sx={{
          flex: 1,
          color: NAVY,
          fontSize: 16,
          fontFamily: "'Inter', sans-serif",
          "& input::placeholder": {
            color: `${NAVY}70`,
            opacity: 1,
          },
        }}
      />
      {value && (
        <IconButton
          size="small"
          onClick={() => onChange("")}
          sx={{ color: `${NAVY}60`, p: 0.3, "&:hover": { color: NAVY } }}
        >
          <ClearIcon sx={{ fontSize: 18 }} />
        </IconButton>
      )}
    </Box>
  );
}