import React from "react";
import { Box } from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { FeatureCard } from "./FeatureCard";

const COMPANY_FEATURES = [
  {
    icon: <DescriptionOutlinedIcon />,
    title: "CV Scoring",
    description: "Smart tools to improve and strengthen your resume.",
    route: "/company/cv-scoring",
    aiMessage: "I want to score a CV",
  },
  {
    icon: <SmartToyOutlinedIcon />,
    title: "Talk with Potato AI 🌱🥔",
    description:
      "Chat with Potato AI to get instant help, guidance, and smart suggestions to support your career journey.",
    route: "/company/ai-chat",
    aiMessage: "I need help with hiring decisions",
  },
  {
    icon: <GroupsOutlinedIcon />,
    title: "Community for Job Seekers and Recruiters",
    description:
      "A shared space where job seekers and recruiters connect, share opportunities, and engage within the same career field.",
    route: "/CompanyCommunity",
    aiMessage: null,
  },
];

export function CompanyFeaturesGrid() {
  const row1 = COMPANY_FEATURES.slice(0, 2); // CV Scoring + Potato AI side by side
  const row2 = COMPANY_FEATURES.slice(2, 3); // Community full-width

  return (
    <Box sx={{ width: "100%", maxWidth: 1080, mx: "auto", px: { xs: 2, md: 4 } }}>
      {/* ── Row 1 · 2 equal cards ─────────────────────────── */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
          mb: 3,
        }}
      >
        {row1.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </Box>

      {/* ── Row 2 · 1 full-width card ─────────────────────── */}
      <Box>
        {row2.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </Box>
    </Box>
  );
}
