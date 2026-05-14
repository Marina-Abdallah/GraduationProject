import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NAVY = "#13206d";
const GREEN = "#84fba2";
const LIGHT_BLUE = "#90baef";

export function FeatureCard({ icon, title, description, route, aiMessage }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route, { state: { message: aiMessage } });
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        background: "white",
        borderRadius: "20px",
        padding: "32px 28px 28px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        cursor: "pointer",
        boxShadow: "0 2px 18px rgba(144,186,239,0.22)",
        border: "1.5px solid rgba(144,186,239,0.18)",
        transition: "all 0.25s ease",
        height: "100%",
        minHeight: 230,
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 14px 40px rgba(132,251,162,0.38)",
          border: `1.5px solid ${GREEN}`,
        },
      }}
    >
      {/* Icon container — matches the Figma rounded-square with border */}
      <Box
        sx={{
          width: 72,
          height: 72,
          borderRadius: "16px",
          border: `2px solid ${LIGHT_BLUE}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2.5,
          flexShrink: 0,
          "& > svg": { fontSize: 36, color: LIGHT_BLUE },
        }}
      >
        {icon}
      </Box>

      {/* Title */}
      <Typography
        sx={{
          color: NAVY,
          fontFamily: "Inter, sans-serif",
          fontWeight: 700,
          fontSize: "17px",
          lineHeight: 1.35,
          mb: 1.5,
        }}
      >
        {title}
      </Typography>

      {/* Description */}
      <Typography
        sx={{
          color: NAVY,
          opacity: 0.62,
          fontFamily: "Inter, sans-serif",
          fontSize: "14px",
          lineHeight: 1.65,
        }}
      >
        {description}
      </Typography>
    </Box>
  );
}
