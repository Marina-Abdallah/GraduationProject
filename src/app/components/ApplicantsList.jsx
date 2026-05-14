import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { ApplicantCard } from "./ApplicantCard";
import { RejectDialog } from "./RejectDialog";

const NAVY  = "#13206d";
const GREEN = "#84fba2";

const SORT_OPTIONS = [
  { key: "score",  label: "Highest score" },
  { key: "newest", label: "Newest" },
];

export function ApplicantsList({ applicants: initialApplicants }) {
  const [sortBy, setSortBy] = useState("score");
  const [applicants, setApplicants] = useState(initialApplicants);

  // Dialog state
  const [rejectTarget, setRejectTarget] = useState(null); // applicant object

  // ── Sorted list ──────────────────────────────────────────────────────────
  const sorted = [...applicants].sort((a, b) => {
    if (sortBy === "score")  return b.matchScore - a.matchScore;
    if (sortBy === "newest") return a.daysAgo - b.daysAgo;
    return 0;
  });

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleAccept = (id) => {
    setApplicants((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "accepted" } : a))
    );
  };

  const handleRejectClick = (applicant) => {
    setRejectTarget(applicant);
  };

  const handleRejectConfirm = () => {
    if (!rejectTarget) return;
    setApplicants((prev) =>
      prev.map((a) => (a.id === rejectTarget.id ? { ...a, status: "rejected" } : a))
    );
    setRejectTarget(null);
  };

  const handleRejectCancel = () => setRejectTarget(null);

  return (
    <>
      {/* Sort tabs */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          py: 2,
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            color: NAVY,
            fontSize: 15,
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            mr: 1,
          }}
        >
          Sort By:
        </Typography>
        {SORT_OPTIONS.map((opt) => {
          const isActive = sortBy === opt.key;
          return (
            <Box
              key={opt.key}
              onClick={() => setSortBy(opt.key)}
              sx={{
                px: 2.5,
                py: 0.7,
                borderRadius: "20px",
                cursor: "pointer",
                bgcolor: isActive ? GREEN : "white",
                border: `1.5px solid ${isActive ? GREEN : `${NAVY}25`}`,
                color: NAVY,
                fontSize: 14,
                fontWeight: isActive ? 700 : 500,
                fontFamily: "'Inter', sans-serif",
                transition: "all 0.2s",
                userSelect: "none",
                "&:hover": { borderColor: GREEN, bgcolor: isActive ? GREEN : `${GREEN}30` },
              }}
            >
              {opt.label}
            </Box>
          );
        })}
      </Box>

      {/* Separator */}
      <Box sx={{ height: "2px", bgcolor: GREEN, mx: 2, mb: 3, borderRadius: 1 }} />

      {/* Applicants */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {sorted.map((applicant) => (
          <ApplicantCard
            key={applicant.id}
            applicant={applicant}
            onAccept={() => handleAccept(applicant.id)}
            onReject={() => handleRejectClick(applicant)}
          />
        ))}
      </Box>

      {/* Reject confirmation dialog */}
      <RejectDialog
        open={Boolean(rejectTarget)}
        applicantName={rejectTarget?.name || ""}
        onConfirm={handleRejectConfirm}
        onCancel={handleRejectCancel}
      />
    </>
  );
}
