import React, { useState, useMemo } from "react";
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

export function MyJobApplication() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Applications");
  const [selectedJob, setSelectedJob] = useState(null);

  // Filter logic
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Search logic (title, company, status)
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.status.toLowerCase().includes(searchLower);

      // Tab filter logic
      const matchesFilter = 
        activeFilter === "All Applications" || 
        job.status === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, activeFilter]);

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
          <div className="py-20 text-center text-gray-500 text-lg">
            No applications match your search.
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