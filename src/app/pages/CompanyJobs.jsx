import React, { useState, useMemo, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { CompanyNavbar } from "../components/CompanyNavbar";
import { Footer } from "../components/Footer";
import { JobSearchBar } from "../components/JobSearchBar";
import { JobFilterTabs } from "../components/JobFilterTabs";
import { JobsGrid } from "../components/JobsGrid";
import backgroundImg from "../../assets/Background.png";
import api from "../../api/axios";
const NAVY = "#13206d";

export function CompanyJobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/Jobs/my-jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      const mappedJobs = response.data.map((job) => ({
        ...job,

        title: job.title,
        companyName: job.companyName,
        location: job.location,

        jobStatus: job.jobStatus,
        applicantsCount: job.applicantsCount,

        createdAt: job.createdAt,

        bannerImageUrl: job.bannerImageUrl,
        companyPictureUrl: job.companyPictureUrl,
      }));


      console.log("My Jobs:", mappedJobs);

      setJobs(mappedJobs);

    } catch (error) {
      console.error("Failed loading jobs:", error);
    } finally {
      setLoading(false);
    }
  };


  fetchJobs();

}, []);

  const filteredJobs = useMemo(() => {
    let filtered = [...jobs];

    if (activeFilter === "active") {
      filtered = filtered.filter(
        (j) => j.jobStatus?.toLowerCase() === "active"
      );
    } else if (activeFilter === "closed") {
      filtered = filtered.filter(
        (j) => j.jobStatus?.toLowerCase() === "closed"
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();

      filtered = filtered.filter(
        (j) =>
          j.title?.toLowerCase().includes(q) ||
          j.companyName?.toLowerCase().includes(q) ||
          j.location?.toLowerCase().includes(q) ||
          j.jobStatus?.toLowerCase().includes(q)
      );
    }

    return filtered;
  }, [jobs, searchQuery, activeFilter]);

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
      <Box sx={{ width: "100%", pt: 3, px: { xs: 2, md: 4 }, position: "relative", zIndex: 20 }}>
        <CompanyNavbar />
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
          Company Jobs
        </Typography>

        <Box sx={{ mb: 2.5 }}>
          <JobSearchBar value={searchQuery} onChange={setSearchQuery} />
        </Box>

        <Box sx={{ mb: 3 }}>
          <JobFilterTabs active={activeFilter} onChange={setActiveFilter} />
        </Box>

        <JobsGrid jobs={filteredJobs} />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", width: "100%", pb: 0 }}>
        <Footer />
      </Box>
    </Box>
  );
}