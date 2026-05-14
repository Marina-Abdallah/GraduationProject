import React from "react";
import {
  Box,
  Typography,
  Button,
  Chip,
  Divider,
  Avatar
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

// Banner images
import bannerFrontend from "../../assets/FrontendJob.png";
import bannerBackend from "../../assets/BackendJob.png";
import bannerGraphic from "../../assets/GraphicJob.png";
import bannerUIUX1 from "../../assets/UI&UXJob1.png";
import bannerSoftware from "../../assets/SoftwareJob.png";
import bannerUIUX2 from "../../assets/UI&UXJob2.png";
import backgroundImg from "../../assets/Background.png";

import { CompanyNavbar } from "../components/CompanyNavbar";
import { Footer } from "../components/Footer";
import { ApplicantsList } from "../components/ApplicantsList";
import { COMPANY_JOBS } from "../../data/companyJobs";
import { useAppContext } from "../components/AppContext";
import defaultPhoto from "../../assets/defaultCompanyImg.jpg";

const BANNER_MAP = {
  frontend: bannerFrontend,
  backend: bannerBackend,
  graphic: bannerGraphic,
  uiux1: bannerUIUX1,
  software: bannerSoftware,
  uiux2: bannerUIUX2,
};

const NAVY = "#13206d";
const GREEN = "#84fba2";
const LIGHT_BLUE = "#90baef";

// ── 4-square MS logo (mirrored from JobCard) ─────────────────────────────────
function MSLogo({ size = 44 }) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        bgcolor: "white",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
      }}
    >
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px", p: "8px", width: "100%", height: "100%" }}>
        <Box sx={{ bgcolor: "#F25022", borderRadius: "2px" }} />
        <Box sx={{ bgcolor: "#7FBA00", borderRadius: "2px" }} />
        <Box sx={{ bgcolor: "#00A4EF", borderRadius: "2px" }} />
        <Box sx={{ bgcolor: "#FFB900", borderRadius: "2px" }} />
      </Box>
    </Box>
  );
}

export function CompanyJobDetailsPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const job = COMPANY_JOBS.find((j) => j.id === jobId);

  // ── 404 guard ─────────────────────────────────────────────────────────────
  if (!job) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
          gap: 3,
        }}
      >
        <Typography sx={{ color: NAVY, fontSize: 28, fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>
          Job not found
        </Typography>
        <Button
          onClick={() => navigate("/CompanyJobs")}
          startIcon={<ArrowBackIcon />}
          sx={{
            bgcolor: GREEN,
            color: NAVY,
            borderRadius: "20px",
            px: 3,
            py: 1,
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            textTransform: "none",
            "&:hover": { bgcolor: "#6ef094" },
          }}
        >
          Back to Company Jobs
        </Button>
      </Box>
    );
  }

  const banner = BANNER_MAP[job.bannerKey] || bannerFrontend;
  const isActive = job.status === "Active";
  const { company } = useAppContext();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top center",
      }}
    >
      {/* ── Navbar ── */}
      <Box sx={{ width: "100%", pt: 4, px: { xs: 2, md: 4 }, position: "relative", zIndex: 20 }}>
        <CompanyNavbar />
      </Box>

      {/* ── Content ── */}
      <Box sx={{ flex: 1, width: "100%", maxWidth: 1100, px: { xs: 0, sm: 2, md: 4 }, pt: 4, pb: 8 }}>

        {/* ── Hero banner ── */}
        <Box
          sx={{
            position: "relative",
            height: { xs: 200, sm: 280, md: 320 },
            borderRadius: { xs: 0, sm: "24px 24px 0 0" },
            overflow: "hidden",
            mb: 0,
            boxShadow: "0 8px 40px rgba(19,32,109,0.18)",
          }}
        >
          <img
            src={banner}
            alt={job.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          {/* gradient overlay */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.33) 0%, transparent 100%)",
            }}
          />

          {/* Back button */}
          <Box sx={{ position: "absolute", top: 18, left: 20 }}>
            <Button
              onClick={() => navigate("/CompanyJobs")}
              startIcon={<ArrowBackIcon />}
              sx={{
                bgcolor: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(6px)",
                color: NAVY,
                borderRadius: "22px",
                px: 2.5,
                py: 0.8,
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                textTransform: "none",
                boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
                "&:hover": { bgcolor: "white" },
              }}
            >
              Back to Company Jobs
            </Button>
          </Box>

          {/* Company logo + name (bottom-left) */}
          <Box
            sx={{
              position: "absolute",
              bottom: 20,
              left: 24,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            {/* <MSLogo size={48} /> */}
            <Avatar
              src={company.photo || defaultPhoto}
              alt={company.name}
              sx={{
                width: 48,
                height: 48,
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
                  fontSize: 16,
                  fontWeight: 700,
                  fontFamily: "'Inter', sans-serif",
                  textShadow: "0 1px 6px rgba(0,0,0,0.5)",
                  lineHeight: 1.2,
                }}
              >
                {job.company}
              </Typography>
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: 13,
                  fontFamily: "'Inter', sans-serif",
                  textShadow: "0 1px 4px rgba(0,0,0,0.4)",
                }}
              >
                {job.location}
              </Typography>
            </Box>
          </Box>

          {/* Job title (bottom-center) */}
          <Box
            sx={{
              position: "absolute",
              bottom: 22,
              left: 0,
              right: 0,
              textAlign: "center",
              pointerEvents: "none",
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: { xs: 24, sm: 32, md: 38 },
                fontWeight: 800,
                fontFamily: "'Inter', sans-serif",
                textShadow: "0 2px 12px rgba(0,0,0,0.55)",
                letterSpacing: "-0.5px",
              }}
            >
              {job.title}
            </Typography>
          </Box>
        </Box>

        {/* ── Info strip ── */}
        <Box
          sx={{
            bgcolor: "white",
            mx: { xs: 0, sm: 0 },
            px: { xs: 2.5, sm: 4 },
            py: 2,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: { xs: 1.5, sm: 2.5 },
            borderRadius: { xs: 0, sm: "0 0 16px 16px" },
            boxShadow: "0 4px 20px rgba(19,32,109,0.07)",
          }}
        >
          {/* Status */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: isActive ? "#2ed573" : "#C32929",
                flexShrink: 0,
                boxShadow: isActive
                  ? "0 0 0 3px rgba(46,213,115,0.25)"
                  : "0 0 0 3px rgba(195,41,41,0.2)",
              }}
            />
            <Typography sx={{ color: NAVY, fontSize: 14, fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>
              {job.status}
            </Typography>
          </Box>

          <Divider orientation="vertical" flexItem sx={{ borderColor: "rgba(19,32,109,0.1)" }} />

          {/* Location */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
            <LocationOnOutlinedIcon sx={{ fontSize: 17, color: LIGHT_BLUE }} />
            <Typography sx={{ color: NAVY, fontSize: 14, fontFamily: "'Inter', sans-serif" }}>
              {job.location}
            </Typography>
          </Box>

          <Divider orientation="vertical" flexItem sx={{ borderColor: "rgba(19,32,109,0.1)" }} />

          {/* Applications */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
            <PeopleOutlineIcon sx={{ fontSize: 17, color: LIGHT_BLUE }} />
            <Typography sx={{ color: NAVY, fontSize: 14, fontFamily: "'Inter', sans-serif" }}>
              <strong>{job.applicationsCount}</strong> Applications
            </Typography>
          </Box>

          <Divider orientation="vertical" flexItem sx={{ borderColor: "rgba(19,32,109,0.1)" }} />

          {/* Date */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
            <CalendarTodayOutlinedIcon sx={{ fontSize: 16, color: LIGHT_BLUE }} />
            <Typography sx={{ color: `${NAVY}80`, fontSize: 14, fontFamily: "'Inter', sans-serif" }}>
              {job.date}
            </Typography>
          </Box>
        </Box>

        {/* ── Body: description + applicants side-by-side on large screens ── */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            mt: 3,
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "stretch", md: "flex-start" },
            px: { xs: 1, sm: 0 },
          }}
        >
          {/* ── Left: description card ── */}
          <Box
            sx={{
              bgcolor: "white",
              borderRadius: "20px",
              p: { xs: "20px 18px", sm: "28px 32px" },
              boxShadow: "0 4px 20px rgba(19,32,109,0.07)",
              width: { xs: "100%", md: 320 },
              flexShrink: 0,
            }}
          >
            {/* Section title */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <WorkOutlineIcon sx={{ fontSize: 20, color: LIGHT_BLUE }} />
              <Typography
                sx={{
                  color: NAVY,
                  fontSize: 17,
                  fontWeight: 700,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Job Description
              </Typography>
            </Box>

            <Typography
              sx={{
                color: NAVY,
                fontSize: 14,
                lineHeight: 1.85,
                fontFamily: "'Inter', sans-serif",
                opacity: 0.78,
              }}
            >
              {job.description}
            </Typography>

            {/* Divider */}
            <Box sx={{ height: "1px", bgcolor: "rgba(19,32,109,0.08)", my: 2.5 }} />

            {/* Requirements */}
            <Typography
              sx={{
                color: NAVY,
                fontSize: 14,
                fontWeight: 700,
                fontFamily: "'Inter', sans-serif",
                mb: 1.5,
              }}
            >
              Requirements
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {job.requirements.map((req) => (
                <Chip
                  key={req}
                  label={req}
                  sx={{
                    bgcolor: `${LIGHT_BLUE}22`,
                    color: NAVY,
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: 12,
                    height: 28,
                    border: `1px solid ${LIGHT_BLUE}88`,
                  }}
                />
              ))}
            </Box>

            {/* Applicant summary */}
            <Box
              sx={{
                mt: 3,
                p: "14px 18px",
                bgcolor: `${GREEN}22`,
                borderRadius: "14px",
                border: `1px solid ${GREEN}`,
              }}
            >
              <Typography
                sx={{
                  color: NAVY,
                  fontSize: 13,
                  fontFamily: "'Inter', sans-serif",
                  opacity: 0.7,
                  mb: 0.3,
                }}
              >
                Total Applicants
              </Typography>
              <Typography
                sx={{
                  color: NAVY,
                  fontSize: 28,
                  fontWeight: 800,
                  fontFamily: "'Inter', sans-serif",
                  lineHeight: 1.2,
                }}
              >
                {job.applicationsCount}
              </Typography>
              <Typography
                sx={{
                  color: NAVY,
                  fontSize: 12,
                  fontFamily: "'Inter', sans-serif",
                  opacity: 0.55,
                  mt: 0.5,
                }}
              >
                {job.applicants.length} loaded for review
              </Typography>
            </Box>
          </Box>

          {/* ── Right: applicants section ── */}
          <Box
            sx={{
              flex: 1,
              bgcolor: "white",
              borderRadius: "20px",
              p: { xs: "16px 12px 24px", sm: "20px 28px 32px" },
              boxShadow: "0 4px 20px rgba(19,32,109,0.07)",
              minWidth: 0,
            }}
          >
            <ApplicantsList applicants={job.applicants} />
          </Box>
        </Box>
      </Box>

      {/* ── Footer ── */}
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Footer />
      </Box>
    </Box>
  );
}