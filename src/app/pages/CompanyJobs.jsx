import React, { useState, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { CompanyNavbar } from "../components/CompanyNavbar";
import { Footer }        from "../components/Footer";
import { JobSearchBar }  from "../components/JobSearchBar";
import { JobFilterTabs } from "../components/JobFilterTabs";
import { JobsGrid }      from "../components/JobsGrid";
import { COMPANY_JOBS }  from "../../data/companyJobs";
import backgroundImg     from "../../assets/Background.png";

const NAVY = "#13206d";

export function CompanyJobsPage() {
  const [searchQuery, setSearchQuery]   = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredJobs = useMemo(() => {
    let jobs = COMPANY_JOBS;

    if (activeFilter === "active") {
      jobs = jobs.filter((j) => j.status === "Active");
    } else if (activeFilter === "canceled") {
      jobs = jobs.filter((j) => j.status === "Canceled");
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      jobs = jobs.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q) ||
          j.status.toLowerCase().includes(q)
      );
    }

    return jobs;
  }, [searchQuery, activeFilter]);

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
      <Box sx={{ width: "100%", pt: 4, px: { xs: 2, md: 4 }, position: "relative", zIndex: 20 }}>
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