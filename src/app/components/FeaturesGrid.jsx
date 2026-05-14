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

// Shared row-container style
const rowContainerSx = {
  borderRadius: "24px",
  p: { xs: "20px", md: "16px 16px" },
 // boxShadow: "0 4px 28px rgba(144,186,239,0.18)",
};

export function FeaturesGrid() {
  const row1 = FEATURES.slice(0, 3);
  const row2 = FEATURES.slice(3, 5);

  return (
    <Box sx={{ width: "100%", maxWidth: 1080, mx: "auto", px: { xs: 2, md: 4 } }}>
      {/* ── Row 1 · 3 equal cards ─────────────────────────────── */}
      <Box sx={{ ...rowContainerSx,mb:0.5}}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
            gap: 3,
          }}
        >
          {row1.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </Box>
      </Box>

      {/* ── Row 2 · 2 centered cards ──────────────────────────── */}
      <Box
        sx={{
          ...rowContainerSx,
          position: "relative",
          overflow: "hidden",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -14,
            left: -14,
            width: 60,
            height: 60,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 3,
            flexWrap: { xs: "wrap", sm: "nowrap" },
          }}
        >
          {row2.map((f) => (
            <Box
              key={f.title}
              sx={{
                flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 12px)" },
                maxWidth: { sm: "calc(50% - 12px)" },
                minWidth: 0,
              }}
            >
              <FeatureCard {...f} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}