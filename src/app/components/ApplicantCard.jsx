import React from "react";
import { Box, Avatar, Typography, Button, Tooltip } from "@mui/material";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const NAVY = "#13206d";
const GREEN = "#84fba2";
const LIGHT_BLUE = "#90baef";

// ── AI match badge colour ─────────────────────────────────────────────────────
function matchColor(score) {
  if (score >= 75) return { bg: GREEN, text: NAVY };
  if (score >= 50) return { bg: "#FBBC04", text: NAVY };
  return { bg: "#ff5a5a", text: "white" };
}

// ── Avatar initials + color ──────────────────────────────────────────────────
const AVATAR_COLORS = [
  "#90baef", "#c8b4e3", "#84fba2", "#ffb347",
  "#ff8fa3", "#b5ead7", "#fdfd96", "#a0c4ff",
];
function getAvatarColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}
function getInitials(name) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

// ── Applied date label ────────────────────────────────────────────────────────
function appliedLabel(daysAgo) {
  if (daysAgo < 1) return "Applied today";
  if (daysAgo === 1) return "Applied 1 day ago";
  if (daysAgo < 7) return `Applied ${daysAgo} days ago`;
  if (daysAgo < 14) return "Applied 1 week ago";
  if (daysAgo < 21) return "Applied 2 weeks ago";
  if (daysAgo < 30) return "Applied 3 weeks ago";
  return `Applied ${Math.round(daysAgo / 30)} month${Math.round(daysAgo / 30) > 1 ? "s" : ""} ago`;
}

// ── Component ─────────────────────────────────────────────────────────────────
export function ApplicantCard({ applicant, onAccept, onReject }) {
  const mc = matchColor(applicant.matchScore);
  const color = getAvatarColor(applicant.name);
  const isAccepted = applicant.status === "accepted";
  const isRejected = applicant.status === "rejected";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: { xs: 1.5, sm: 2 },
        p: "14px 16px",
        bgcolor: "white",
        borderRadius: "16px",
        border: isAccepted
          ? `1.5px solid ${GREEN}`
          : isRejected
            ? "1.5px solid #ff5a5a"
            : "1.5px solid rgba(19,32,109,0.08)",
        boxShadow: "0 2px 12px rgba(19,32,109,0.05)",
        transition: "border-color 0.2s",
        flexWrap: { xs: "wrap", sm: "nowrap" },
      }}
    >
      {/* Avatar */}
      <Avatar
        sx={{
          width: 52,
          height: 52,
          bgcolor: color,
          color: NAVY,
          fontWeight: 700,
          fontSize: 17,
          fontFamily: "'Inter', sans-serif",
          border: `3px solid ${color}88`,
          flexShrink: 0,
          opacity: isRejected ? 0.5 : 1,
        }}
      >
        {getInitials(applicant.name)}
      </Avatar>

      {/* Name + role + match + applied */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
          <Typography
            sx={{
              color: NAVY,
              fontSize: 16,
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              opacity: isRejected ? 0.45 : 1,
            }}
          >
            {applicant.name}
          </Typography>
          {/* AI match badge */}
          <Box
            sx={{
              bgcolor: mc.bg,
              color: mc.text,
              fontSize: 12,
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              borderRadius: "10px",
              px: 1.2,
              py: 0.25,
              whiteSpace: "nowrap",
              opacity: isRejected ? 0.5 : 1,
            }}
          >
            {applicant.matchScore}% Match
          </Box>
        </Box>
        <Typography
          sx={{
            color: NAVY,
            fontSize: 13,
            opacity: 0.6,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {applicant.role}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
          <Typography
            sx={{
              color: NAVY,
              fontSize: 13,
              opacity: 0.6,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {applicant.portofolioLink ? (
              <a href={applicant.portofolioLink} target="_blank" rel="noopener noreferrer" style={{ color: "#1a0dab", textDecoration: "underline" }}>
                View Portfolio
              </a>
            ) : (
              "No portfolio link"
            )}
          </Typography>
          <Typography
            sx={{
              color: NAVY,
              fontSize: 13,
              opacity: 0.6,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {applicant.phone ? (
              <a href={`tel:${applicant.phone}`} style={{ color: "#1a0dab", textDecoration: "underline" }}>
                {applicant.phone}
              </a>
            ) : (
              "No phone number"
            )}
          </Typography>
        </Box>

        <Typography
          sx={{
            color: NAVY,
            fontSize: 12,
            opacity: 0.5,
            fontFamily: "'Inter', sans-serif",
            mt: 0.2,
          }}
        >
          {appliedLabel(applicant.daysAgo)}
        </Typography>

      </Box>

      {/* Actions */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          flexShrink: 0,
          flexWrap: "wrap",
          justifyContent: "flex-end",
        }}
      >
        {/* See CV */}
        <Tooltip title="View uploaded CV">
          <Button
            variant="contained"
            href={applicant.cvFile}
            //onClick={(e) => e.preventDefault()}
            component="a"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              bgcolor: LIGHT_BLUE,
              color: NAVY,
              borderRadius: "12px",
              minWidth: 64,
              px: 1.2,
              py: 1,
              textTransform: "none",
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              fontWeight: 600,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0.2,
              boxShadow: "none",
              "&:hover": { bgcolor: "#78a8dc" },
            }}
          >
            <ArticleOutlinedIcon sx={{ fontSize: 20 }} />
            see CV
          </Button>
        </Tooltip>

        {isAccepted ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              bgcolor: `${GREEN}30`,
              color: "#1a7d44",
              borderRadius: "10px",
              px: 2,
              py: 0.8,
              fontSize: 14,
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <CheckCircleOutlinedIcon sx={{ fontSize: 16 }} />
            Accepted
          </Box>
        ) : isRejected ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              bgcolor: "rgba(255,90,90,0.12)",
              color: "#C32929",
              borderRadius: "10px",
              px: 2,
              py: 0.8,
              fontSize: 14,
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <CancelOutlinedIcon sx={{ fontSize: 16 }} />
            Rejected
          </Box>
        ) : (
          <>
            {/* Accept */}
            <Button
              onClick={onAccept}
              variant="contained"
              sx={{
                bgcolor: GREEN,
                color: NAVY,
                borderRadius: "10px",
                px: 2.5,
                py: 0.8,
                minWidth: 90,
                fontSize: 14,
                fontWeight: 700,
                fontFamily: "'Inter', sans-serif",
                textTransform: "none",
                boxShadow: "none",
                "&:hover": { bgcolor: "#6ef094", boxShadow: "none" },
              }}
            >
              Accept
            </Button>

            {/* Reject */}
            <Button
              onClick={onReject}
              variant="contained"
              sx={{
                bgcolor: "#C32929",
                color: "white",
                borderRadius: "10px",
                px: 2.5,
                py: 0.8,
                minWidth: 90,
                fontSize: 14,
                fontWeight: 700,
                fontFamily: "'Inter', sans-serif",
                textTransform: "none",
                boxShadow: "none",
                "&:hover": { bgcolor: "#a01f1f", boxShadow: "none" },
              }}
            >
              Reject
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}
