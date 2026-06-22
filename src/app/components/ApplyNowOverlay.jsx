import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  Button,
  Chip,
  Divider,
  LinearProgress,
  Avatar,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SendIcon from "@mui/icons-material/Send";
import CategoryIcon from "@mui/icons-material/Category";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useAppContext } from "../components/AppContext";
import defaultPhoto from "../../assets/defaultCompanyImg.png";
import api from "../../api/axios";

// ── Brand colors ────────────────────────────────────────────────────────────
const NAVY = "#13206d";
const GREEN = "#84fba2";
const LIGHT_BLUE = "#90baef";
const GOLD = "#FBBC04";

// ── Helper functions ────────────────────────────────────────────────────────
const normalizeImageUrl = (url) => {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) return url;
  const apiBase = import.meta.env.VITE_API_BASE_URL || "https://localhost:7292/api";
  try {
    const origin = new URL(apiBase).origin;
    return `${origin}${url.startsWith("/") ? "" : "/"}${url}`;
  } catch (e) {
    return url;
  }
};

const parseStringToList = (str) => {
  if (!str) return [];
  return str
    .split(/\r?\n/)
    .map((line) => line.replace(/^[•\-\*\s]+/, "").trim())
    .filter(Boolean);
};

// ── Checkmark list item ───────────────────────────────────────────────────────
function CheckItem({ text }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
      <CheckCircleIcon sx={{ color: GREEN, fontSize: 20, mt: "2px", flexShrink: 0 }} />
      <span style={{ color: NAVY, fontSize: 15, lineHeight: 1.5 }}>{text}</span>
    </div>
  );
}

export function ApplyNowOverlay({ open, onClose, isCompanyAccount = false, jobId }) {
  // Form values
  const [cvFile, setCvFile] = useState(null);
  const [selectedCvId, setSelectedCvId] = useState("");
  const [phone, setPhone] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [dragging, setDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // API loading / details state
  const [jobData, setJobData] = useState(null);
  const [loadingJob, setLoadingJob] = useState(false);
  const [errorJob, setErrorJob] = useState(null);

  // User saved CVs state
  const [myCvs, setMyCvs] = useState([]);
  const [loadingCvs, setLoadingCvs] = useState(false);

  // Submit flow states
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [submitErrorMsg, setSubmitErrorMsg] = useState(null);

  const { company } = useAppContext();

  // Reset inputs when opened
  useEffect(() => {
    if (open) {
      setCvFile(null);
      setSelectedCvId("");
      setPhone("");
      setPortfolio("");
      setSubmitResult(null);
      setSubmitErrorMsg(null);
      setUploadProgress(0);
      setUploading(false);
      setSubmitting(false);
      setJobData(null);
      setErrorJob(null);
    }
  }, [open]);

  // Fetch job & CV details on open + jobId change
  useEffect(() => {
    if (open && jobId) {
      const fetchJobDetails = async () => {
        setLoadingJob(true);
        setErrorJob(null);
        try {
          const token = localStorage.getItem("token");
          const response = await api.get(`/Jobs/${jobId}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          });
          setJobData(response.data);
        } catch (err) {
          console.error("Error fetching job details:", err);
          setErrorJob("Failed to load job details.");
        } finally {
          setLoadingJob(false);
        }
      };

      const fetchMyCvs = async () => {
        setLoadingCvs(true);
        try {
          const token = localStorage.getItem("token");
          const response = await api.get("/cv/my-cvs", {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          });
          setMyCvs(response.data || []);
        } catch (err) {
          console.error("Error fetching my CVs:", err);
        } finally {
          setLoadingCvs(false);
        }
      };

      fetchJobDetails();
      fetchMyCvs();
    }
  }, [open, jobId]);

  // ── File handling ────────────────────────────────────────────────────────
  function handleFile(file) {
    setCvFile(file);
    setSelectedCvId(""); // Clear selected dropdown CV
    setUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setUploading(false);
          return 100;
        }
        return p + 20;
      });
    }, 150);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  // ── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (isCompanyAccount) {
      setSubmitResult("error");
      setSubmitErrorMsg("You cannot apply for jobs as a company account.");
      return;
    }

    if (!phone.trim()) {
      setSubmitErrorMsg("Phone number is required.");
      return;
    }

    if (!selectedCvId && !cvFile) {
      setSubmitErrorMsg("Please select a saved CV or upload a new one.");
      return;
    }

    setSubmitting(true);
    setSubmitErrorMsg(null);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("PhoneNumber", phone.trim());
      formData.append("PortfolioLink", portfolio.trim());
      if (selectedCvId) {
        formData.append("CvId", String(selectedCvId));
      }
      if (cvFile) {
        formData.append("cvFile", cvFile);
      }

      await api.post(`/Jobs/${jobId}/apply`, formData, {
        headers: token
          ? { Authorization: `Bearer ${token}` }
          : {},
      });

      setSubmitResult("success");
      setTimeout(() => {
        setSubmitResult(null);
        setCvFile(null);
        setSelectedCvId("");
        setPhone("");
        setPortfolio("");
        setUploadProgress(0);
        setUploading(false);
        setSubmitting(false);
        onClose();
      }, 2200);
    } catch (err) {
      console.error("Apply job request failed:", err);
      const responseData = err.response?.data;
      const errorMessage =
        responseData?.message ||
        responseData?.title ||
        (typeof responseData === "string" ? responseData : null) ||
        err.message ||
        "An error occurred while submitting your application.";
      setSubmitResult("error");
      setSubmitErrorMsg(errorMessage);
      setSubmitting(false);
    }
  };

  // ── Reset on close ───────────────────────────────────────────────────────
  function handleClose() {
    setSubmitResult(null);
    onClose();
  }

  // ── Parsed Job Data fields ────────────────────────────────────────────────
  const displayTitle = jobData?.title || jobData?.jobTitle || "Job Title";
  const displayCompany = jobData?.companyName || jobData?.company || "Company";
  const displayCompanyPhoto = normalizeImageUrl(jobData?.companyPictureUrl || jobData?.companyPhoto || jobData?.companyLogo) || defaultPhoto;
  const displayLocation = jobData?.cityOffice
    ? `${jobData.cityOffice}${jobData.location ? `, ${jobData.location}` : ""}`
    : (jobData?.location || "Location");
  const displayType = jobData?.jobType || jobData?.type || "Full-time";
  const displayCategory = jobData?.jobCategoryName || jobData?.category || "";
  const displaySkills = Array.isArray(jobData?.requiredSkills)
    ? jobData.requiredSkills
    : Array.isArray(jobData?.skills)
      ? jobData.skills
      : Array.isArray(jobData?.jobSkills)
        ? jobData.jobSkills
        : typeof jobData?.skills === "string"
          ? jobData.skills.split(",").map(s => s.trim())
          : [];
  const displayAbout = jobData?.aboutRole || jobData?.about || jobData?.jobDescription || jobData?.shortDescription || "";
  const displayResponsibilities = parseStringToList(jobData?.responsibilities || "");
  const displayRequirements = parseStringToList(jobData?.requirements || "");

  let displaySalary = "Discuss in Interview";
  if (jobData && !jobData.isSalaryInInterview) {
    const from = jobData.salaryFrom || jobData.salaryMin;
    const to = jobData.salaryTo || jobData.salaryMax;
    if (from && to) {
      displaySalary = `$${from} – $${to}`;
    } else if (from) {
      displaySalary = `$${from}+`;
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "20px",
          overflow: "hidden",
          maxHeight: "90vh",
          boxShadow: "0 24px 64px rgba(19,32,109,0.18)",
        },
      }}
    >
      <DialogContent sx={{ p: 0, display: "flex", flexDirection: "row", overflow: "hidden" }}>
        {/* ── Left panel: job detail ─────────────────────────────── */}
        <div
          style={{
            flex: 1,
            background: `linear-gradient(160deg, rgba(144,186,239,0.12) 0%, rgba(132,251,162,0.08) 100%)`,
            borderRight: `1px solid rgba(19,32,109,0.08)`,
            overflowY: "auto",
            padding: "36px 32px",
          }}
        >
          {loadingJob ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "350px", gap: 16 }}>
              <CircularProgress sx={{ color: GREEN }} />
              <span style={{ color: NAVY, fontSize: 16, fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>Loading job details...</span>
            </div>
          ) : errorJob ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "350px", gap: 16, padding: "0 16px" }}>
              <span style={{ color: "#C32929", fontSize: 16, fontWeight: 600, textAlign: "center", fontFamily: "'Inter', sans-serif" }}>{errorJob}</span>
            </div>
          ) : !jobData ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "350px" }}>
              <span style={{ color: NAVY, opacity: 0.6, fontSize: 16, fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>No job selected</span>
            </div>
          ) : (
            <>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 20 }}>
                <Avatar
                  src={displayCompanyPhoto}
                  alt={displayCompany}
                  sx={{
                    width: 65,
                    height: 65,
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
                <div>
                  <h2 style={{ margin: 0, color: NAVY, fontSize: 22, fontWeight: 700, lineHeight: 1.3 }}>
                    {displayTitle}
                  </h2>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4, flexWrap: "wrap" }}>
                    <span style={{ color: GREEN, fontWeight: 600, fontSize: 14 }}>{displayCompany}</span>
                    <span style={{ color: LIGHT_BLUE, fontSize: 14 }}>·</span>
                    <LocationOnOutlinedIcon sx={{ fontSize: 14, color: LIGHT_BLUE }} />
                    <span style={{ color: LIGHT_BLUE, fontSize: 14 }}>{displayLocation}</span>
                    <span style={{ color: LIGHT_BLUE, fontSize: 14 }}>·</span>
                    <WorkOutlineIcon sx={{ fontSize: 14, color: LIGHT_BLUE }} />
                    <span style={{ color: LIGHT_BLUE, fontSize: 14 }}>{displayType}</span>
                  </div>
                  {displayCategory && (
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4, flexWrap: "wrap" }}>
                      <CategoryIcon sx={{ fontSize: 14, color: LIGHT_BLUE }} />
                      <span style={{ color: LIGHT_BLUE, fontSize: 14 }}>{displayCategory}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                {displaySkills.map((t) => (
                  <Chip
                    key={t}
                    label={t}
                    size="small"
                    sx={{
                      background: `rgba(132,251,162,0.18)`,
                      color: NAVY,
                      fontWeight: 600,
                      fontSize: 13,
                      border: `1px solid rgba(132,251,162,0.5)`,
                      borderRadius: "8px",
                    }}
                  />
                ))}
                <Chip
                  icon={<AttachMoneyIcon sx={{ fontSize: 14, color: GREEN + " !important" }} />}
                  label={displaySalary}
                  size="small"
                  sx={{
                    background: `rgba(251,188,4,0.12)`,
                    color: NAVY,
                    fontWeight: 600,
                    fontSize: 13,
                    border: `1px solid rgba(251,188,4,0.4)`,
                    borderRadius: "8px",
                  }}
                />
              </div>

              <Divider sx={{ borderColor: "rgba(19,32,109,0.08)", mb: 3 }} />

              {/* About */}
              <h3 style={{ color: NAVY, fontSize: 16, fontWeight: 700, margin: "0 0 10px" }}>About the Role</h3>
              <p style={{ color: NAVY, opacity: 0.75, fontSize: 14, lineHeight: 1.7, margin: "0 0 24px" }}>
                {displayAbout}
              </p>

              {/* Responsibilities */}
              {displayResponsibilities.length > 0 && (
                <>
                  <h3 style={{ color: NAVY, fontSize: 16, fontWeight: 700, margin: "0 0 12px" }}>Responsibilities</h3>
                  <div style={{ marginBottom: 24 }}>
                    {displayResponsibilities.map((r, i) => <CheckItem key={i} text={r} />)}
                  </div>
                </>
              )}

              {/* Requirements */}
              {displayRequirements.length > 0 && (
                <>
                  <h3 style={{ color: NAVY, fontSize: 16, fontWeight: 700, margin: "0 0 12px" }}>Requirements</h3>
                  <div>
                    {displayRequirements.map((r, i) => <CheckItem key={i} text={r} />)}
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {/* ── Right panel: form ──────────────────────────────────── */}
        <div style={{ flex: 1, overflowY: "auto", padding: "36px 32px", position: "relative", scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {/* Close button */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: NAVY,
              background: "rgba(19,32,109,0.06)",
              "&:hover": { background: "rgba(19,32,109,0.12)" },
            }}
          >
            <CloseIcon />
          </IconButton>

          <h2 style={{ color: NAVY, fontSize: 22, fontWeight: 700, margin: "0 0 28px" }}>Submit Application</h2>

          {/* Success / Error state */}
          {submitResult === "success" ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
                padding: "60px 0",
                textAlign: "center",
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 72, color: GREEN }} />
              <h3 style={{ color: NAVY, fontSize: 20, fontWeight: 700, margin: 0 }}>Application Submitted!</h3>
              <p style={{ color: NAVY, opacity: 0.6, fontSize: 15, margin: 0 }}>
                We&apos;ve received your application for <strong>{displayTitle}</strong> at {displayCompany}.
              </p>
            </div>
          ) : submitResult === "error" ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
                padding: "60px 0",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "rgba(195,41,41,0.08)",
                  border: "2.5px solid #C32929",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CloseIcon sx={{ fontSize: 40, color: "#C32929" }} />
              </div>
              <h3 style={{ color: "#C32929", fontSize: 20, fontWeight: 700, margin: 0 }}>
                Application Not Submitted
              </h3>
              <p style={{ color: NAVY, opacity: 0.65, fontSize: 15, margin: "0 auto", maxWidth: 320, lineHeight: 1.6 }}>
                {submitErrorMsg || "An error occurred during submission."}
              </p>
              <button
                onClick={() => setSubmitResult(null)}
                style={{
                  marginTop: 16,
                  padding: "10px 32px",
                  borderRadius: 12,
                  border: `1.5px solid rgba(19,32,109,0.2)`,
                  background: "transparent",
                  color: NAVY,
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              {/* ── RESUME / CV ─────────────────────────── */}
              <label style={{ display: "block", color: NAVY, fontSize: 12, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>
                RESUME / CV
              </label>

              {/* ── Dropdown Select Saved CVs ── */}
              {myCvs.length > 0 && !cvFile && (
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="cv-select-label" sx={{ color: `${NAVY}aa`, fontSize: 14, fontFamily: "'Inter', sans-serif" }}>
                    Select from your saved CVs
                  </InputLabel>
                  <Select
                    labelId="cv-select-label"
                    id="cv-select"
                    value={selectedCvId}
                    label="Select from your saved CVs"
                    disabled={loadingCvs}
                    onChange={(e) => {
                      setSelectedCvId(e.target.value);
                      setCvFile(null);
                    }}
                    sx={{
                      borderRadius: "14px",
                      fontSize: 14,
                      color: NAVY,
                      fontFamily: "'Inter', sans-serif",
                      "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(19,32,109,0.18)" },
                      "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: LIGHT_BLUE },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: NAVY, borderWidth: 1.5 },
                    }}
                  >
                    <MenuItem value="">
                      <em>-- Choose an existing CV --</em>
                    </MenuItem>
                    {myCvs.map((cv) => (
                      <MenuItem key={cv.id} value={cv.id}>
                        {cv.fileName || cv.name || `CV #${cv.id}`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {/* ── Visual confirmation for Selected CV ── */}
              {selectedCvId && (
                <div
                  style={{
                    border: `1.5px solid ${GREEN}`,
                    borderRadius: 14,
                    padding: "14px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 16,
                    background: "rgba(132,251,162,0.06)",
                  }}
                >
                  <CheckCircleIcon sx={{ color: GREEN, fontSize: 28 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: NAVY, fontWeight: 600, fontSize: 14, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      Using Saved CV: {myCvs.find((c) => c.id === selectedCvId)?.fileName || myCvs.find((c) => c.id === selectedCvId)?.name || `CV #${selectedCvId}`}
                    </div>
                    <div style={{ color: NAVY, opacity: 0.5, fontSize: 12 }}>
                      Saved on your profile
                    </div>
                  </div>
                  <IconButton size="small" onClick={() => setSelectedCvId("")} sx={{ color: "#C32929" }}>
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </div>
              )}

              {/* ── OR Divider if no selection and no upload ── */}
              {!selectedCvId && !cvFile && myCvs.length > 0 && (
                <div style={{ textAlign: "center", margin: "12px 0", color: NAVY, opacity: 0.5, fontSize: 13, fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
                  — OR —
                </div>
              )}

              {cvFile ? (
                /* Uploaded state */
                <div
                  style={{
                    border: `1.5px solid ${GREEN}`,
                    borderRadius: 14,
                    padding: "14px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 16,
                    background: "rgba(132,251,162,0.06)",
                  }}
                >
                  <InsertDriveFileOutlinedIcon sx={{ color: NAVY, fontSize: 28 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: NAVY, fontWeight: 600, fontSize: 14, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {cvFile.name}
                    </div>
                    <div style={{ color: NAVY, opacity: 0.5, fontSize: 12 }}>
                      {(cvFile.size / 1024).toFixed(0)} KB
                    </div>
                    {uploading && (
                      <LinearProgress
                        variant="determinate"
                        value={uploadProgress}
                        sx={{ mt: 1, borderRadius: 4, height: 4, backgroundColor: "rgba(19,32,109,0.1)", "& .MuiLinearProgress-bar": { background: GREEN } }}
                      />
                    )}
                  </div>
                  <IconButton size="small" onClick={() => { setCvFile(null); setUploadProgress(0); }} sx={{ color: "#C32929" }}>
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </div>
              ) : !selectedCvId ? (
                /* Drop zone */
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: `1.5px dashed ${dragging ? GREEN : LIGHT_BLUE}`,
                    borderRadius: 14,
                    padding: "28px 20px 20px",
                    textAlign: "center",
                    cursor: "pointer",
                    background: dragging ? "rgba(132,251,162,0.06)" : "rgba(144,186,239,0.04)",
                    transition: "all 0.2s",
                    marginBottom: 16,
                  }}
                >
                  <CloudUploadOutlinedIcon sx={{ fontSize: 36, color: LIGHT_BLUE, mb: 1 }} />
                  <p style={{ margin: "0 0 4px", color: NAVY, fontSize: 14 }}>
                    Drop your CV here or{" "}
                    <span style={{ color: GREEN, fontWeight: 600, textDecoration: "underline" }}>browse</span>
                  </p>
                  <p style={{ margin: 0, color: NAVY, opacity: 0.45, fontSize: 12 }}>PDF, DOCX up to 10MB</p>
                </div>
              ) : null}

              <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" style={{ display: "none" }} onChange={handleFileChange} />

              {/* ── PHONE + PORTFOLIO ─────────────────────── */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 22 }}>
                <div>
                  <label style={{ display: "block", color: NAVY, fontSize: 12, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>
                    PHONE NUMBER
                  </label>
                  <TextField
                    fullWidth
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "14px",
                        fontSize: 14,
                        color: NAVY,
                        "& fieldset": { borderColor: "rgba(19,32,109,0.18)" },
                        "&:hover fieldset": { borderColor: LIGHT_BLUE },
                        "&.Mui-focused fieldset": { borderColor: NAVY, borderWidth: 1.5 },
                      },
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", color: NAVY, fontSize: 12, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>
                    PORTFOLIO LINK
                  </label>
                  <TextField
                    fullWidth
                    placeholder="https://"
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "14px",
                        fontSize: 14,
                        color: NAVY,
                        "& fieldset": { borderColor: "rgba(19,32,109,0.18)" },
                        "&:hover fieldset": { borderColor: LIGHT_BLUE },
                        "&.Mui-focused fieldset": { borderColor: NAVY, borderWidth: 1.5 },
                      },
                    }}
                  />
                </div>
              </div>

              {submitErrorMsg && (
                <div style={{ color: "#C32929", fontSize: 13, marginTop: 16, textAlign: "center", fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
                  {submitErrorMsg}
                </div>
              )}

              {/* ── ACTION BUTTONS ──────────────────────────── */}
              <Button
                fullWidth
                variant="contained"
                endIcon={submitting ? <CircularProgress size={20} sx={{ color: NAVY }} /> : <SendIcon />}
                onClick={handleSubmit}
                disabled={submitting}
                sx={{
                  mt: 3,
                  py: 1.6,
                  borderRadius: "14px",
                  background: `linear-gradient(135deg, ${GREEN} 0%, #6ef094 100%)`,
                  color: NAVY,
                  fontWeight: 700,
                  fontSize: 16,
                  textTransform: "none",
                  boxShadow: `0 4px 18px rgba(132,251,162,0.5)`,
                  "&:hover": {
                    background: `linear-gradient(135deg, #6ef094 0%, ${GREEN} 100%)`,
                    boxShadow: `0 6px 24px rgba(132,251,162,0.65)`,
                  },
                }}
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </Button>

              {/* Terms */}
              <p style={{ textAlign: "center", color: NAVY, opacity: 0.4, fontSize: 12, marginTop: 16, lineHeight: 1.6 }}>
                By clicking &quot;Submit Application&quot;, you agree to our{" "}
                <span style={{ color: LIGHT_BLUE, textDecoration: "underline", cursor: "pointer" }}>Terms of Service</span>
                {" "}and{" "}
                <span style={{ color: LIGHT_BLUE, textDecoration: "underline", cursor: "pointer" }}>Privacy Policy</span>.
              </p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}