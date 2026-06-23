import React, { useState, useMemo, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { MainNavbar } from "../components/MainNavbar";
import { JobSearchBar } from "../components/JobSearchBar";
import { ApplicationFilters } from "../components/ApplicationFilters";
import { JobApplicationCard } from "../components/JobApplicationCard";
import { JobDetailsModal } from "../components/JobDetailsModal";
import { Footer } from "../components/Footer";
import backgroundImg from "../../assets/Background.png";
import "../../styles/App.css";
import api from "../../api/axios";

const NAVY = "#13206d";
const GREEN = "#84fba2";
const LIGHT_BLUE = "#90baef";
const BASE_URL = "https://localhost:7292";

const STATUS_COLOR_MAP = {
  pending: "#FBBF24",
  accepted: "#10B981",
  rejected: "#EF4444",
};

function getStatusColor(statusName = "") {
  return STATUS_COLOR_MAP[statusName.toLowerCase()] ?? "#94A3B8";
}

function formatAppliedDate(dateStr) {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return "today";
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (days < 30) { const w = Math.floor(days / 7); return `${w} week${w > 1 ? "s" : ""} ago`; }
  const m = Math.floor(days / 30);
  return `${m} month${m > 1 ? "s" : ""} ago`;
}

function toAbsoluteUrl(url) {
  if (!url) return null;
  return url.startsWith("http") ? url : `${BASE_URL}${url}`;
}

/** Map API response shape → component field names */
function normalizeApplication(app) {
  const statusName =
    app.statusName ??
    app.status ??
    app.applicationStatus ??
    "";

  return {
    ...app,

    id: app.id,

    title: app.jobTitle ?? "",
    company: app.companyName ?? "",

    location: app.jobLocation ?? "",
    cityOffice: app.jobCityOffice ?? "",

    type: app.jobType ?? "",

    // Card Description
    shortDescription: app.jobShortDescription ?? "",

    // Modal Description
    aboutRole: app.jobAboutRole ?? "",

    jobMode: app.jobLocationMode ?? "",

    applied: formatAppliedDate(app.createdAt),

    status: statusName,
    statusColor: getStatusColor(statusName),

    bannerImage: toAbsoluteUrl(
      app.jobBannerImageUrl
    ),

    logoImage: toAbsoluteUrl(
      app.companyPictureUrl
    ),

    requiredSkills:
      app.requiredSkillsName ?? [],
  };
}

export function MyJobApplication() {
  const getApplication = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found");
        return;
      }

      const res = await api.get("/Jobs/my-applications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const raw = Array.isArray(res.data)
        ? res.data
        : res.data?.items ?? res.data?.data ?? [];

      const normalized = raw.map(normalizeApplication);
      setApplications(normalized);
      console.log("raw:", res.data);
      console.log("normalized:", normalized);
    } catch (err) {
      console.log(err);
    }
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Applications");
  const [selectedJob, setSelectedJob] = useState(null);
  const [applications, setApplications] = useState([]);
  // Filter logic
  const filteredJobs = useMemo(() => {
    return applications.filter((job) => {
      // Search using normalized field names
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        (job.title ?? "").toLowerCase().includes(searchLower) ||
        (job.company ?? "").toLowerCase().includes(searchLower) ||
        (job.status ?? "").toLowerCase().includes(searchLower);

      // Tab filter logic
      const matchesFilter =
        activeFilter === "All Applications" ||
        job.status === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, activeFilter, applications]);

  useEffect(() => {
    getApplication();
  }, []);

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
      <Box
        sx={{
          width: "100%",
          pt: 3,
          px: { xs: 2, md: 4 },
          position: "relative",
          zIndex: 20,
        }}
      >
        <MainNavbar />
      </Box>

      <Box sx={{ flex: 1, width: "100%", maxWidth: 1200, px: { xs: 2, md: 4 }, pt: 4, pb: 8 }}>
        <Typography
          sx={{
            color: NAVY,
            fontSize: { xs: 28, sm: 36 },
            fontWeight: 800,
            fontFamily: "'Inter', sans-serif",
            mb: 3,
          }}
        >
          My Job Application
        </Typography>

        <Box sx={{ mb: 2.5 }}>
          {/* <SearchBar value={searchTerm} onChange={setSearchTerm} /> */}
          <JobSearchBar value={searchTerm} onChange={setSearchTerm} />
        </Box>

        <Box sx={{ mb: 3 }}>
          <ApplicationFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </Box>


        {/* Jobs Grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (

              <JobApplicationCard
                key={job.id}
                job={job}
                onClick={(job) => setSelectedJob(job)}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-lg" style={{ color: NAVY }}>
            No applications.
          </div>
        )}
      </Box>

      <Footer />

      <JobDetailsModal
        job={selectedJob}
        open={!!selectedJob}
        onClose={() => setSelectedJob(null)}
      />
    </Box>
  );
}