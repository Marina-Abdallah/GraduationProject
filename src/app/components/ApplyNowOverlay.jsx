import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  Button,
  Chip,
  Divider,
  LinearProgress,
  Avatar
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
import defaultPhoto from "../../assets/defaultCompanyImg.jpg";

// ── Brand colors ────────────────────────────────────────────────────────────
const NAVY = "#13206d";
const GREEN = "#84fba2";
const LIGHT_BLUE = "#90baef";
const GOLD = "#FBBC04";

// ── Job data (matches the Figma Post 3 card) ─────────────────────────────────
const JOB = {
  title: "Frontend Developer",
  company: "MicroSoft",
  type: "Full-time",
  category: "Software Engineering",
  location: "Cairo, Egypt",
  salary: "$90k – $120k",
  skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
  about:
    "MicroSoft is seeking a talented Frontend Developer to join our growing product team. You will work closely with designers and backend engineers to craft world-class user experiences that reach millions of people worldwide.",
  responsibilities: [
    "Build and maintain high-quality React web applications.",
    "Collaborate with designers to translate Figma mocks into pixel-perfect UIs.",
    "Write clean, maintainable, and well-tested TypeScript code.",
    "Participate in code reviews and architectural discussions.",
  ],
  requirements: [
    "3+ years of experience with React and modern JavaScript.",
    "Strong command of TypeScript and CSS-in-JS or Tailwind CSS.",
    "Experience working in Agile / Scrum environments.",
    "Familiarity with REST APIs and state management (Redux / Zustand).",
  ],
};

// ── Microsoft-style logo (colored squares, same as Figma) ────────────────────
function MSLogo({ size = 48 }) {
  const half = size / 2 - 1;
  return (
    <div
      style={{ width: size, height: size, padding: 4, background: "#fff", borderRadius: 10, border: `1px solid rgba(19,32,109,0.1)`, flexShrink: 0 }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, width: "100%", height: "100%" }}>
        <div style={{ background: "#F25022", borderRadius: 2 }} />
        <div style={{ background: "#7FBA00", borderRadius: 2 }} />
        <div style={{ background: "#00A4EF", borderRadius: 2 }} />
        <div style={{ background: "#FFB900", borderRadius: 2 }} />
      </div>
    </div>
  );
}

// ── Checkmark list item ───────────────────────────────────────────────────────
function CheckItem({ text }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
      <CheckCircleIcon sx={{ color: GREEN, fontSize: 20, mt: "2px", flexShrink: 0 }} />
      <span style={{ color: NAVY, fontSize: 15, lineHeight: 1.5 }}>{text}</span>
    </div>
  );
}

export function ApplyNowOverlay({ open, onClose, isCompanyAccount = false }) {
  const [cvFile, setCvFile] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [dragging, setDragging] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const { company } = useAppContext();

  const MAX_COVER = 1000;

  // ── File handling ────────────────────────────────────────────────────────
  function handleFile(file) {
    setCvFile(file);
    setUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((p) => {
        if (p >= 100) { clearInterval(interval); setUploading(false); return 100; }
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
  function handleSubmit() {
    if (isCompanyAccount) {
      setSubmitResult("error");
      return;
    }
    setSubmitResult("success");
    setTimeout(() => {
      setSubmitResult(null);
      setCvFile(null);
      setCoverLetter("");
      setPhone("");
      setPortfolio("");
      setUploadProgress(0);
      onClose();
    }, 2200);
  }

  // ── Reset on close ───────────────────────────────────────────────────────
  function handleClose() {
    setSubmitResult(null);
    onClose();
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
            flex: "0 0 45%",
            background: `linear-gradient(160deg, rgba(144,186,239,0.12) 0%, rgba(132,251,162,0.08) 100%)`,
            borderRight: `1px solid rgba(19,32,109,0.08)`,
            overflowY: "auto",
            padding: "36px 32px",
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 20 }}>
            {/* MS Logo  */}
            <Avatar
              src={company.photo || defaultPhoto}
              alt={company.name}
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
                {JOB.title}
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4, flexWrap: "wrap" }}>
                <span style={{ color: GREEN, fontWeight: 600, fontSize: 14 }}>{JOB.company}</span>
                <span style={{ color: LIGHT_BLUE, fontSize: 14 }}>·</span>
                <LocationOnOutlinedIcon sx={{ fontSize: 14, color: LIGHT_BLUE }} />
                <span style={{ color: LIGHT_BLUE, fontSize: 14 }}>{JOB.location}</span>
                <span style={{ color: LIGHT_BLUE, fontSize: 14 }}>·</span>
                <WorkOutlineIcon sx={{ fontSize: 14, color: LIGHT_BLUE }} />
                <span style={{ color: LIGHT_BLUE, fontSize: 14 }}>{JOB.type}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4, flexWrap: "wrap" }}>
              <CategoryIcon sx={{ fontSize: 14, color: LIGHT_BLUE }} />
              <span style={{ color: LIGHT_BLUE, fontSize: 14 }}>{JOB.category}</span> 
              </div>
            </div>
          </div>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
            {JOB.skills.map((t) => (
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
              label={JOB.salary}
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
            {JOB.about}
          </p>

          {/* Responsibilities */}
          <h3 style={{ color: NAVY, fontSize: 16, fontWeight: 700, margin: "0 0 12px" }}>Responsibilities</h3>
          <div style={{ marginBottom: 24 }}>
            {JOB.responsibilities.map((r, i) => <CheckItem key={i} text={r} />)}
          </div>

          {/* Requirements */}
          <h3 style={{ color: NAVY, fontSize: 16, fontWeight: 700, margin: "0 0 12px" }}>Requirements</h3>
          <div>
            {JOB.requirements.map((r, i) => <CheckItem key={i} text={r} />)}
          </div>
        </div>

        {/* ── Right panel: form ──────────────────────────────────── */}
        <div style={{ flex: 1, overflowY: "auto", padding: "36px 32px", position: "relative" }}>
          {/* Close button */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute", top: 16, right: 16,
              color: NAVY, background: "rgba(19,32,109,0.06)",
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
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                gap: 16, padding: "60px 0", textAlign: "center",
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 72, color: GREEN }} />
              <h3 style={{ color: NAVY, fontSize: 20, fontWeight: 700, margin: 0 }}>Application Submitted!</h3>
              <p style={{ color: NAVY, opacity: 0.6, fontSize: 15, margin: 0 }}>
                We've received your application for <strong>Frontend Developer</strong> at MicroSoft.
              </p>
            </div>
          ) : submitResult === "error" ? (
            <div
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                gap: 16, padding: "60px 0", textAlign: "center",
              }}
            >
              {/* Error icon circle */}
              <div
                style={{
                  width: 80, height: 80, borderRadius: "50%",
                  background: "rgba(195,41,41,0.08)",
                  border: "2.5px solid #C32929",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <CloseIcon sx={{ fontSize: 40, color: "#C32929" }} />
              </div>
              <h3 style={{ color: "#C32929", fontSize: 20, fontWeight: 700, margin: 0 }}>
                Application Not Submitted
              </h3>
              <p style={{ color: NAVY, opacity: 0.65, fontSize: 15, margin: 0, maxWidth: 300, lineHeight: 1.6 }}>
                You cannot apply for jobs as a company account.
              </p>
              <button
                onClick={handleClose}
                style={{
                  marginTop: 8,
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
                Close
              </button>
            </div>
          ) : (
            <>
              {/* ── RESUME / CV ─────────────────────────── */}
              <label style={{ display: "block", color: NAVY, fontSize: 12, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>
                RESUME / CV
              </label>

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
                    marginBottom: 8,
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
              ) : (
                /* Drop zone */
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
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
                    marginBottom: 8,
                  }}
                >
                  <CloudUploadOutlinedIcon sx={{ fontSize: 36, color: LIGHT_BLUE, mb: 1 }} />
                  <p style={{ margin: "0 0 4px", color: NAVY, fontSize: 14 }}>
                    Drop your CV here or{" "}
                    <span style={{ color: GREEN, fontWeight: 600, textDecoration: "underline" }}>browse</span>
                  </p>
                  <p style={{ margin: 0, color: NAVY, opacity: 0.45, fontSize: 12 }}>PDF, DOCX up to 10MB</p>

                  {/* Scan with AI option */}
                  <div
                    style={{
                      marginTop: 16,
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      background: `rgba(132,251,162,0.15)`,
                      border: `1px solid ${GREEN}`,
                      borderRadius: 12,
                      padding: "12px 14px",
                      textAlign: "left",
                    }}
                  >
                    <SmartToyOutlinedIcon sx={{ color: GREEN, fontSize: 28, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ color: NAVY, fontWeight: 700, fontSize: 13 }}>Scan with AI Assistant</div>
                      <div style={{ color: NAVY, opacity: 0.55, fontSize: 12, marginTop: 2 }}>
                        AI will extract your details for a faster application
                      </div>
                    </div>
                    <ChevronRightIcon sx={{ color: NAVY, opacity: 0.4, fontSize: 20, flexShrink: 0 }} />
                  </div>
                </div>
              )}

              <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" style={{ display: "none" }} onChange={handleFileChange} />

              {/* ── COVER LETTER ─────────────────────────── */}
              <label style={{ display: "block", color: NAVY, fontSize: 12, fontWeight: 700, letterSpacing: 1, margin: "22px 0 10px" }}>
                COVER LETTER <span style={{ color: NAVY, opacity: 0.4, fontWeight: 400, letterSpacing: 0, fontSize: 12 }}>(OPTIONAL)</span>
              </label>

              <TextField
                multiline
                minRows={4}
                maxRows={6}
                fullWidth
                placeholder="Tell us why you're a great fit for MicroSoft..."
                value={coverLetter}
                onChange={(e) => {
                  if (e.target.value.length <= MAX_COVER) setCoverLetter(e.target.value);
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                    fontSize: 14,
                    color: NAVY,
                    "& fieldset": { borderColor: "rgba(19,32,109,0.18)" },
                    "&:hover fieldset": { borderColor: LIGHT_BLUE },
                    "&.Mui-focused fieldset": { borderColor: NAVY, borderWidth: 1.5 },
                  },
                  "& textarea::placeholder": { color: `${NAVY}60` },
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                <span style={{ color: NAVY, opacity: 0.4, fontSize: 12 }}>Maximum {MAX_COVER} characters</span>
                <span style={{ color: coverLetter.length >= MAX_COVER ? "#C32929" : NAVY, opacity: 0.5, fontSize: 12 }}>
                  {coverLetter.length} / {MAX_COVER}
                </span>
              </div>

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
                        borderRadius: "14px", fontSize: 14, color: NAVY,
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
                        borderRadius: "14px", fontSize: 14, color: NAVY,
                        "& fieldset": { borderColor: "rgba(19,32,109,0.18)" },
                        "&:hover fieldset": { borderColor: LIGHT_BLUE },
                        "&.Mui-focused fieldset": { borderColor: NAVY, borderWidth: 1.5 },
                      },
                    }}
                  />
                </div>
              </div>

              {/* ── ACTION BUTTONS ──────────────────────────── */}
              <Button
                fullWidth
                variant="contained"
                endIcon={<SendIcon />}
                onClick={handleSubmit}
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
                Submit Application
              </Button>

              <Button
                fullWidth
                variant="outlined"
                startIcon={<BookmarkBorderIcon />}
                sx={{
                  mt: 1.5,
                  py: 1.4,
                  borderRadius: "14px",
                  borderColor: "rgba(19,32,109,0.2)",
                  color: NAVY,
                  fontWeight: 700,
                  fontSize: 15,
                  textTransform: "none",
                  "&:hover": { borderColor: NAVY, background: "rgba(19,32,109,0.04)" },
                }}
              >
                Save for Later
              </Button>

              {/* Terms */}
              <p style={{ textAlign: "center", color: NAVY, opacity: 0.4, fontSize: 12, marginTop: 16, lineHeight: 1.6 }}>
                By clicking "Submit Application", you agree to our{" "}
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