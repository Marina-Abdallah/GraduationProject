import React from "react";
import { Box, Typography } from "@mui/material";
import WorkOffOutlinedIcon from "@mui/icons-material/WorkOffOutlined";
import { JobCard } from "./JobCard";

const NAVY = "#13206d";

export function JobsGrid({ jobs }) {
  if (jobs.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          py: 12,
          bgcolor: "white",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(19,32,109,0.06)",
        }}
      >
        <WorkOffOutlinedIcon sx={{ fontSize: 56, color: NAVY, opacity: 0.2 }} />
        <Typography
          sx={{
            color: NAVY,
            fontSize: 18,
            fontWeight: 600,
            opacity: 0.45,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          No jobs found
        </Typography>
        <Typography
          sx={{
            color: NAVY,
            fontSize: 14,
            opacity: 0.3,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Try adjusting your search or filter
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        },
        gap: 3,
      }}
    >
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </Box>
  );
}