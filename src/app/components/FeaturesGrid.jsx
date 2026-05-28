import React from "react";
import { Box } from "@mui/material";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import { FeatureCard } from "./FeatureCard";

const GREEN = "#84fba2";

const FEATURES = [
  {
    icon: <UploadFileOutlinedIcon />,
    title: "Resume Improvement",
    description: "Smart tools to improve and strengthen your resume.",
    route: "/resume",
    aiMessage: "Help me improve my resume",
  },
  {
    icon: <AssessmentOutlinedIcon />,
    title: "Analyze Your Resume",
    description: "AI resume analysis with instant feedback on ATS, keywords, and content.",
    route: "/analyze",
    aiMessage: "Analyze my resume",
  },
  {
    icon: <PercentOutlinedIcon />,
    title: "Calculate Your Salary",
    description:
      "Use our salary calculator to understand your earning potential and make smarter career decisions.",
    route: "/salary",
    aiMessage: "Calculate my salary",
  },
  {
    icon: <GroupsOutlinedIcon />,
    title: "Community for Job Seekers and Recruiters",
    description:
      "A shared space where job seekers and recruiters connect, share opportunities, and engage within the same career field.",
    route: "/Community",
    aiMessage: "Join job community",
  },
  {
    icon: <SmartToyOutlinedIcon />,
    title: "Talk with Potato AI 🌱🥔",
    description:
      "Chat with Potato AI to get instant help, guidance, and smart suggestions to support your career journey.",
    route: "/ai-chat",
    aiMessage: "I need career guidance",
  },
];


export function FeaturesGrid() {
  const row1 = FEATURES.slice(0, 3);
  const row2 = FEATURES.slice(3, 5);

  return (
    <Box sx={{ width: "100%", maxWidth: 1080, mx: "auto", px: { xs: 2, md: 4 } }}>
      {/* ── Row 1 · 3 equal cards ─────────────────────────────── */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr ", md: "1fr 1fr 1fr" },
          gap: 3,
          mb: 3,
        }}
      >
        {row1.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </Box>

      {/* ── Row 2 · 2 equal cards ─────────────────────────────── */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr",sm: "1fr 1fr", md: "1fr 1fr" },
          gap: 3,
          mb: 3,
        }}
      >
        {row2.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </Box>
    </Box>
  );
}