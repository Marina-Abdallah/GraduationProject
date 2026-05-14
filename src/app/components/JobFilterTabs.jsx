import React from "react";
import { Box, Typography } from "@mui/material";

const NAVY  = "#13206d";
const GREEN = "#84fba2";

const FILTERS = [
  { key: "all",      label: "All Jobs" },
  { key: "active",   label: "Active" },
  { key: "canceled", label: "Canceled" },
];

export function JobFilterTabs({ active, onChange }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
      <Typography
        sx={{
          color: NAVY,
          fontSize: 15,
          fontWeight: 600,
          fontFamily: "'Inter', sans-serif",
          mr: 0.5,
        }}
      >
        Filter By:
      </Typography>

      {FILTERS.map((f) => {
        const isActive = active === f.key;
        return (
          <Box
            key={f.key}
            onClick={() => onChange(f.key)}
            sx={{
              px: 2.5,
              py: 0.7,
              borderRadius: "20px",
              cursor: "pointer",
              border: `1.5px solid ${isActive ? GREEN : `${NAVY}30`}`,
              bgcolor: isActive ? GREEN : "white",
              color: NAVY,
              fontSize: 14,
              fontWeight: isActive ? 700 : 500,
              fontFamily: "'Inter', sans-serif",
              transition: "all 0.2s",
              userSelect: "none",
              "&:hover": {
                borderColor: GREEN,
                bgcolor: isActive ? GREEN : `${GREEN}30`,
              },
            }}
          >
            {f.label}
          </Box>
        );
      })}
    </Box>
  );
}
