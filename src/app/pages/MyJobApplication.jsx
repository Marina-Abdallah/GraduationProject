import React, { useState, useMemo, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { MainNavbar } from "../components/MainNavbar";
import { JobSearchBar } from "../components/JobSearchBar";
import { ApplicationFilters } from "../components/ApplicationFilters";
import { JobApplicationCard } from "../components/JobApplicationCard";
import { JobDetailsModal } from "../components/JobDetailsModal";
import { Footer } from "../components/Footer";
import { jobs } from "../../data/jobs";
import backgroundImg from "../../assets/Background.png";
import "../../styles/App.css";
import api from "../../api/axios";

const NAVY = "#13206d";
const GREEN = "#84fba2";
const LIGHT_BLUE = "#90baef";

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
      setApplications(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const [searchQuery, setSearchQuery]   = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Applications");
  const [selectedJob, setSelectedJob] = useState(null);
  const [applications, setApplications] = useState([]);
  // Filter logic
  const filteredJobs = useMemo(() => {
    return applications.filter((job) => {
      // Search logic (title, company, status)
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        job.jobTitle.toLowerCase().includes(searchLower) ||
        job.companyName.toLowerCase().includes(searchLower) ||
        job.statusName.toLowerCase().includes(searchLower);

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