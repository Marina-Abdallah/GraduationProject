import React from "react";
import { Box, Card, Typography, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import defaultPhoto from "../../assets/defaultCompanyImg.png";
import { useAppContext } from "../components/AppContext";



const NAVY = "#13206d";
const GREEN = "#84fba2";
const LIGHT_BLUE = "#90baef";


// ── Stacked applicant avatars + count ─────────────────────────────────────────
function ApplicationsBadge({ count }) {
  const colors = [LIGHT_BLUE, "#c8b4e3", GREEN];
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {/* 3 stacked avatar circles */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {colors.map((c, i) => (
          <Box
            key={i}
            sx={{
              width: 26,
              height: 26,
              borderRadius: "50%",
              bgcolor: c,
              border: "2px solid white",
              ml: i === 0 ? 0 : "-8px",
              zIndex: colors.length - i,
            }}
          />
        ))}
      </Box>
      {/* Count chip */}
      <Box
        sx={{
          bgcolor: GREEN,
          borderRadius: "12px",
          px: 1.2,
          py: 0.2,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography sx={{ color: NAVY, fontSize: 13, fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>
          +{count}
        </Typography>
      </Box>
    </Box>
  );
}

// ── Main Card ──────────────────────────────────────────────────────────────────
export function JobCard({ job }) {
  const API_BASE_URL = "https://localhost:7292";
  const banner =
  job.bannerImageUrl
    ? `${API_BASE_URL}${job.bannerImageUrl}`
    : "/default-banner.png";
  const isActive = job.jobStatus === "Active";
  const { company } = useAppContext();

  return (
    <Link
      to={`/CompanyJobs/${job.id}`}
      style={{ textDecoration: "none", display: "block" }}
    >
      <Card
        elevation={0}
        sx={{
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid rgba(19,32,109,0.07)",
          boxShadow: "0 4px 24px rgba(19,32,109,0.08)",
          cursor: "pointer",
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 12px 36px rgba(19,32,109,0.14)",
          },
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* ── Banner ── */}
        <Box sx={{ position: "relative", height: 185, flexShrink: 0 }}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.33) 0%, transparent 100%), url(${banner})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          {/* company overlay - bottom left of banner */}
          <Box
            sx={{
              position: "absolute",
              bottom: 10,
              left: 12,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Avatar
              src={
                job.companyPictureUrl
                  ? `${API_BASE_URL}${job.companyPictureUrl}`
                  : defaultPhoto}
              alt={job.companyName}
              sx={{
                width: 40,
                height: 40,
                bgcolor: "white",
                borderRadius: "10px",
                border: "1px solid rgba(19,32,109,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 2px 6px rgba(0,0,0,0.07)",
              }}
            />
            <Box>
              <Typography
                sx={{
                  color: "white",
                  fontSize: 14,
                  fontWeight: 700,
                  fontFamily: "'Inter', sans-serif",
                  textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                  lineHeight: 1.2,
                }}
              >
                {job.companyName}
              </Typography>
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.85)",
                  fontSize: 11,
                  fontFamily: "'Inter', sans-serif",
                  textShadow: "0 1px 3px rgba(0,0,0,0.5)",
                }}
              >
                {job.location || "[ADDRESS]"}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* ── Card body ── */}
        <Box
          sx={{
            p: "14px 16px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            bgcolor: "white",
            flex: 1,
          }}
        >
          {/* Job title */}
          <Typography
            sx={{
              color: NAVY,
              fontSize: 17,
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              textAlign: "center",
              lineHeight: 1.3,
            }}
          >
            {job.title}
          </Typography>

          {/* Applications row */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1.5 }}>
            <Typography
              sx={{
                color: NAVY,
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Applications:
            </Typography>
            <ApplicationsBadge count={job.applicantsCount} />
          </Box>

          {/* Divider */}
          <Box sx={{ height: "1px", bgcolor: "rgba(19,32,109,0.08)" }} />

          {/* Status + Date */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
              <Box
                sx={{
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  bgcolor: isActive ? "#2ed573" : "#C32929",
                  flexShrink: 0,
                }}
              />
              <Typography
                sx={{
                  color: NAVY,
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {job.jobStatus}
              </Typography>
            </Box>
            <Typography
              sx={{
                color: `${NAVY}70`,
                fontSize: 13,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {new Date(job.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
      </Card>
    </Link>
  );
}