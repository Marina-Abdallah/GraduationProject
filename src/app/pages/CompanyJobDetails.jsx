import React, { useState, useEffect } from "react";
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


import { JobActionDialog } from "../components/JobActivationDialog";
import { CompanyNavbar } from "../components/CompanyNavbar";
import { Footer } from "../components/Footer";
import { ApplicantsList } from "../components/ApplicantsList";
import { useAppContext } from "../components/AppContext";
import api from "../../api/axios";

import backgroundImg from "../../assets/Background.png";
import defaultPhoto from "../../assets/defaultCompanyImg.png";


const NAVY = "#13206d";
const GREEN = "#84fba2";
const LIGHT_BLUE = "#90baef";


export function CompanyJobDetailsPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const [openActionDialog, setOpenActionDialog] = useState(false);
  const [jobStatus, setJobStatus] = useState("Pending");

  const isActive = jobStatus === "Active";
  const API_BASE_URL = "https://localhost:7292";

  useEffect(() => {
    if (job) {
      setJobStatus(job.jobStatus);
    }
  }, [job]);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        const [jobResponse, applicantsResponse] = await Promise.all([
          api.get(`/Jobs/${jobId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),

          api.get(`/Jobs/applications/${jobId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const jobData = jobResponse.data;
        const applicantsData = applicantsResponse.data;

        console.log("Job API:", jobData);
        console.log("Applicants API:", applicantsData);

        setJob({
          id: jobData.id,

          title: jobData.title,
          description: jobData.description,
          shortDescription: jobData.shortDescription,

          location: jobData.location,
          locationMode: jobData.locationMode,

          jobType: jobData.jobType,
          cityOffice: jobData.cityOffice,

          salaryFrom: jobData.salaryFrom,
          salaryTo: jobData.salaryTo,

          bannerImageUrl: jobData.bannerImageUrl,

          aboutRole: jobData.aboutRole,
          responsibilities: jobData.responsibilities,
          requirements: jobData.requirements,

          companyId: jobData.companyId,
          companyName: jobData.companyName,
          companyPictureUrl: jobData.companyPictureUrl,

          createdAt: jobData.createdAt,

          jobStatus: jobData.jobStatus,

          skills:
            jobData.requiredSkills ??
            jobData.requiredSkillsName ??
            [],

          applicationsCount:
            jobData.applicantsCount ?? 0,

          applicants: applicantsData.map((app) => ({
            id: app.applicantId,

            name: app.applicantName,

            title: app.applicantHeadline,

            avatar: app.applicantPictureUrl
              ? `${API_BASE_URL}${app.applicantPictureUrl}`
              : defaultPhoto,

            email: app.applicantEmail,

            phoneNumber: app.phoneNumber,

            cvId: app.cvId,

            cvFileName: app.cvFileName,

            matchScore: app.cvScore,

            cvScoreReason: app.cvScoreReason,

            status: app.statusName,

            appliedAt: app.createdAt,

            daysAgo: Math.floor(
              (new Date() - new Date(app.createdAt)) /
              (1000 * 60 * 60 * 24)
            ),
          })),
        });
      } catch (error) {
        console.error("Failed loading job details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleConfirmAction = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.post(
        `/Jobs/${jobId}/set-active`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;

      console.log("Set active response:", data);

      const newStatus = data.isActive
        ? "Active"
        : "Closed";


      setJobStatus(newStatus);


      setJob(prev => ({
        ...prev,
        jobStatus: newStatus
      }));

      setOpenActionDialog(false);

    } catch (error) {
      console.error(error);
    }
  };


  // ── 404 guard ─────────────────────────────────────────────────────────────
if (loading) {
  return (
    <Box sx={{ p: 5 }}>
      <Typography>Loading...</Typography>
    </Box>
  );
}
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
          backgroundSize: "100% auto",
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


  const banner =
    job.bannerImageUrl
      ?
      `${API_BASE_URL}${job.bannerImageUrl}`
      :
      "/default-banner.png";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: `url(${backgroundImg})`,
        backgroundSize: "100% auto",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top center",
      }}
    >
      {/* ── Navbar ── */}
      <Box sx={{ width: "100%", pt: 3, px: { xs: 2, md: 4 }, position: "relative", zIndex: 20 }}>
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
            {/* MS Logo */}
            <Avatar
              src={
                job.companyPictureUrl
                  ? `${API_BASE_URL}${job.companyPictureUrl}`
                  : defaultPhoto
              }
              alt={job.companyName}
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
                {job.companyName}
              </Typography>
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: 13,
                  fontFamily: "'Inter', sans-serif",
                  textShadow: "0 1px 4px rgba(0,0,0,0.4)",
                }}
              >
                {/* {job.location} */}
                {job.location || "[ADDRESS]"}
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
              {jobStatus}
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
              {new Date(job.createdAt).toLocaleDateString()}
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
          <Box>
            <Box
              sx={{
                bgcolor: "white",
                borderRadius: "20px",
                p: { xs: "20px 18px", sm: "28px 32px" },
                boxShadow: "0 4px 20px rgba(19,32,109,0.07)",
                width: { xs: "100%", md: 320 },
                flexShrink: 0,
                mb: 2,
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
                Requirements Skills
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {(job.skills ?? job.requiredSkills ?? []).map((req) => (
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                width: "100%",
              }}
            >
              {isActive ? (
                <Button
                  onClick={() => setOpenActionDialog(true)}
                  sx={{
                    width: "250px",
                    py: 1,
                    borderRadius: "20px",
                    bgcolor: "#ff383c",
                    color: "white",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: "16px",
                    textTransform: "none",
                    "&:hover": {
                      bgcolor: "#e02020",
                      boxShadow: "0px 6px 16px rgba(255,56,60,0.45)",
                    },
                  }}
                >
                  {isActive ? "Close The Job" : "Activate The Job"}
                </Button>
              ) : (
                <Button
                  onClick={() => setOpenActionDialog(true)}
                  sx={{
                    width: "250px",
                    py: 1,
                    borderRadius: "20px",
                    bgcolor: "#84fba2",
                    color: "#13206d",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: "16px",
                    textTransform: "none",
                    "&:hover": {
                      bgcolor: "#6ef094",
                      boxShadow: "0px 6px 16px rgba(132,251,162,0.6)",
                    },
                  }}
                >
                  {isActive ? "Close The Job" : "Activate The Job"}
                </Button>
              )}
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

      <JobActionDialog
        open={openActionDialog}
        onClose={() => setOpenActionDialog(false)}
        onConfirm={handleConfirmAction}
        isActive={isActive}
      />

      {/* ── Footer ── */}
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Footer />
      </Box>
    </Box>
  );
}