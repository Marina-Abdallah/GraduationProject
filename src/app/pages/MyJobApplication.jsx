import React, { useState, useMemo, useEffect } from "react";
import { Box } from "@mui/material";
import { MainNavbar } from "../components/MainNavbar";
import { SearchBar } from "../components/SearchBar";
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
    <div
      //if i want navbar to be bold i should add "font-sans" in class name tag
      className="min-h-screen flex flex-col items-center"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          pt: 4,
          px: { xs: 2, md: 4 },
          position: "relative",
          zIndex: 20,
        }}
      >
        <MainNavbar />
      </Box>

      <div className="w-full max-w-6xl px-4 flex-grow flex flex-col mt-12 mb-8">
        <div className="w-full max-w-5xl mx-auto">
          <h1 className="text-[#13206d] text-4xl font-bold mb-8">My Job Application</h1>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>

        <ApplicationFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

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
      </div>

      <Footer />

      <JobDetailsModal
        job={selectedJob}
        open={!!selectedJob}
        onClose={() => setSelectedJob(null)}
      />
    </div>
  );
}