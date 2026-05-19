import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  Button,
  Chip,
  Divider,
  Select,
  MenuItem,
  InputBase,
  InputAdornment,
    Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
//import AttachMoneyIcon              from "@mui/icons-material/AttachMoney";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useAppContext } from "../components/AppContext";
import defaultPhoto from "../../assets/defaultCompanyImg.jpg";

// ── Brand colors ─────────────────────────────────────────────────────────────
const NAVY = "#13206d";
const GREEN = "#84fba2";
const LIGHT_BLUE = "#90baef";

const CATEGORIES = ["Design", "Engineering", "Marketing", "Sales", "Operations", "Finance", "HR", "Product", "Data Science", "Customer Support"];
const LOCATION_MODES = ["On-site", "Remote", "Hybrid"];
const JOB_TYPES = ["Full-time", "Part-time", "Internship", "Apprenticeship", "Temporary", "Contract","Other"];





// ── ALL-CAPS field label ──────────────────────────────────────────────────────
function FieldLabel({ children, optional = false }) {
  return (
    <label style={{ display: "block", color: NAVY, fontSize: 12, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>
      {children}
      {optional && (
        <span style={{ color: NAVY, opacity: 0.4, fontWeight: 400, letterSpacing: 0, fontSize: 12, marginLeft: 6 }}>
          (OPTIONAL)
        </span>
      )}
    </label>
  );
}

// ── Shared TextField sx ────────────────────────────���──────────────────────────
const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    fontSize: 14,
    color: NAVY,
    "& fieldset": { borderColor: "rgba(19,32,109,0.18)" },
    "&:hover fieldset": { borderColor: LIGHT_BLUE },
    "&.Mui-focused fieldset": { borderColor: NAVY, borderWidth: 1.5 },
  },
  "& input::placeholder, & textarea::placeholder": { color: `${NAVY}60` },
};

// ── Shared Select sx ──────────────────────────────────────────────────────────
const selectSx = {
  borderRadius: "14px",
  fontSize: 14,
  color: NAVY,
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(19,32,109,0.18)" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: LIGHT_BLUE },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: NAVY, borderWidth: 1.5 },
};

// ─────────────────────────────────────────────────────────────────────────────
export function CreateJobDialog({ open, onClose, onSubmit }) {
  const [jobTitle, setJobTitle] = useState("");
  const [category, setCategory] = useState("Design");
  const [locationMode, setLocationMode] = useState("On-site");
  const [jobType, setJobType] = useState("Full-time");
  const [city, setCity] = useState("");
  const [skills, setSkills] = useState(["UI Design", "Figma", "Prototyping"]);
  const [skillInput, setSkillInput] = useState("");
  const [salaryType, setSalaryType] = useState("range");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [aboutRole, setAboutRole] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [requirements, setRequirements] = useState("");
  const { company } = useAppContext();
  const [bannerImage, setBannerImage] = useState(null);
  const [bannerPreview, setBannerPreview] = useState("");

  // ── Skills helpers ────────────────────────────────────────────────────────
  const handleAddSkill = () => {
    const t = skillInput.trim();
    if (t && !skills.includes(t)) setSkills(p => [...p, t]);
    setSkillInput("");
  };
  const handleSkillKey = (e) => { if (e.key === "Enter") { e.preventDefault(); handleAddSkill(); } };
  const handleRemoveSkill = (s) => setSkills(p => p.filter(x => x !== s));

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setBannerImage(file);

      const previewURL = URL.createObjectURL(file);
      setBannerPreview(previewURL);
    }
  };

  // ── Submit / reset ────────────────────────────────────────────────────────
  const resetForm = () => {
    setJobTitle(""); setCategory("Design"); setLocationMode("On-site"); setJobType("Full-time"); setCity("");
    setSkills(["UI Design", "Figma", "Prototyping"]); setSkillInput("");
    setSalaryType("range"); setSalaryMin(""); setSalaryMax("");
    setAboutRole(""); setShortDesc(""); setResponsibilities(""); setRequirements("");
    setBannerImage(null);
    setBannerPreview("");
  };

  const isFormValid =
    jobTitle.trim() &&
    category.trim() &&
    locationMode.trim() &&
    jobType.trim() &&
    city.trim() &&
    bannerImage &&
    skills.length > 0 &&
    aboutRole.trim() &&
    responsibilities.trim() &&
    requirements.trim() &&
    (
      salaryType === "discuss" ||
      (salaryMin.trim() && salaryMax.trim())
    );

  const handlePost = () => {
    if (!isFormValid) return;
    onSubmit?.({
      jobTitle: jobTitle.trim(),
      category, 
      shortDesc,
      locationMode,
      jobType,
      city: city.trim(),
      skills: [...skills],
      salaryType,
      salaryMin,
      salaryMax,
      aboutRole: aboutRole.trim(),
      responsibilities: responsibilities.trim(),
      requirements: requirements.trim(),
      bannerImage,
      bannerPreview,
    });
    resetForm(); onClose();
  };
  const handleSaveDraft = () => { resetForm(); onClose(); };
  const handleClose = () => { resetForm(); onClose(); };

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

        {/* ══════════════════════════════════════════════════════════════════
            LEFT PANEL — Company header + metadata fields
            (mirrors the left info-panel of ApplyNowOverlay)
        ══════════════════════════════════════════════════════════════════ */}
        <div
          style={{
            flex: "0 0 45%",
            background: `linear-gradient(160deg, rgba(144,186,239,0.12) 0%, rgba(132,251,162,0.08) 100%)`,
            borderRight: `1px solid rgba(19,32,109,0.08)`,
            overflowY: "auto",
            padding: "36px 30px",
          }}
        >
          {/* Company identity */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
            <Avatar
              src={company.photo || defaultPhoto}
              alt={company.name}
              sx={{
                width: 52,
                height: 52,
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
              <div style={{ color: NAVY, fontWeight: 700, fontSize: 18, lineHeight: 1.3 }}>Microsoft</div>
              <div style={{ color: LIGHT_BLUE, fontSize: 13, marginTop: 2 }}>Technology Company</div>
              <div style={{
                display: "inline-block", marginTop: 6,
                background: "rgba(132,251,162,0.18)", border: `1px solid rgba(132,251,162,0.5)`,
                borderRadius: 20, padding: "2px 10px", color: NAVY, fontSize: 11, fontWeight: 600,
              }}>
                ✦ Company Account
              </div>
            </div>
          </div>

          <Divider sx={{ borderColor: "rgba(19,32,109,0.08)", mb: 3 }} />

          {/* ── JOB TITLE ──────────────────────────────────────────────── */}
          <div style={{ marginBottom: 20 }}>
            <FieldLabel>JOB TITLE</FieldLabel>
            <TextField
              required
              fullWidth
              size="small"
              placeholder="e.g. Senior Product Designer"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              sx={inputSx}
            />
          </div>

          {/* ── CATEGORY ───────────────────────────────────────────────── */}
          <div style={{ marginBottom: 20 }}>
            <FieldLabel>CATEGORY</FieldLabel>
            <Select
              fullWidth
              size="small"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              sx={selectSx}
            >
              {CATEGORIES.map((c) => (
                <MenuItem key={c} value={c} sx={{ fontSize: 14, color: NAVY }}>{c}</MenuItem>
              ))}
            </Select>
          </div>
           {/* ── Short Description ───────────────────────────────────────── */}
          <div style={{ marginBottom: 22 }}>
            <FieldLabel>Short Description of the role</FieldLabel>
            <TextField
              fullWidth
              multiline
              minRows={1}
              maxRows={2}
              required
              placeholder="Describe the role in 100 characters or less…"
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              inputProps={{maxLength: 100 }}
              helperText={<span style={{ color: NAVY }}>{`${shortDesc.length}/100 characters`}</span>}
              sx={inputSx}
            />
          </div>

          {/* ── JOB TYPE ──────────────────────────────────────────── */}
          <div style={{ marginBottom: 20 }}>
            <FieldLabel>JOB TYPE</FieldLabel>
            <Select
              fullWidth
              size="small"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              sx={selectSx}
            >
              {JOB_TYPES.map((c) => (
                <MenuItem key={c} value={c} sx={{ fontSize: 14, color: NAVY }}>{c}</MenuItem>
              ))}
            </Select>
          </div>

          {/* ── LOCATION MODE ──────────────────────────────────────────── */}
          <div style={{ marginBottom: 20 }}>
            <FieldLabel>LOCATION MODE</FieldLabel>
            <div style={{
              display: "flex", border: `1.5px solid rgba(19,32,109,0.18)`,
              borderRadius: 14, overflow: "hidden", background: "rgba(19,32,109,0.03)", height: 40,
            }}>
              {LOCATION_MODES.map((mode, i) => (
                <div
                  key={mode}
                  onClick={() => setLocationMode(mode)}
                  style={{
                    flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: locationMode === mode ? 700 : 500,
                    fontFamily: "'Inter', sans-serif", cursor: "pointer",
                    background: locationMode === mode ? GREEN : "transparent",
                    color: locationMode === mode ? NAVY : `${NAVY}70`,
                    borderRight: i < LOCATION_MODES.length - 1 ? "1px solid rgba(19,32,109,0.1)" : "none",
                    transition: "all 0.15s", userSelect: "none",
                  }}
                >
                  {mode}
                </div>
              ))}
            </div>
          </div>

          {/* ── CITY & OFFICE ──────────────────────────────────────────── */}
          <div style={{ marginBottom: 20 }}>
            <FieldLabel>CITY &amp; OFFICE</FieldLabel>
            <TextField
              required
              fullWidth
              size="small"
              placeholder="Cairo, Egypt"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              sx={inputSx}
            />
          </div>

          {/* ── SALARY RANGE ───────────────────────────────────────────── */}
          <div style={{ marginBottom: 20 }}>
            <FieldLabel optional>SALARY RANGE</FieldLabel>
            {/* Toggle */}
            <div style={{
              display: "flex", border: `1.5px solid rgba(19,32,109,0.18)`,
              borderRadius: 14, overflow: "hidden", background: "rgba(19,32,109,0.03)",
              height: 40, marginBottom: 12,
            }}>
              {[{ key: "range", label: "Set a Range" }, { key: "discuss", label: "Discuss in Interview" }].map(({ key, label }, i) => (
                <div
                  key={key}
                  onClick={() => setSalaryType(key)}
                  style={{
                    flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: salaryType === key ? 700 : 500,
                    fontFamily: "'Inter', sans-serif", cursor: "pointer",
                    background: salaryType === key ? LIGHT_BLUE : "transparent",
                    color: salaryType === key ? "white" : `${NAVY}65`,
                    borderRight: i === 0 ? "1px solid rgba(19,32,109,0.1)" : "none",
                    transition: "all 0.18s", userSelect: "none",
                  }}
                >
                  {label}
                </div>
              ))}
            </div>
            {salaryType === "range" ? (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <TextField
                  required
                  fullWidth
                  size="small"
                  placeholder="6,000"
                  value={salaryMin} onChange={(e) => setSalaryMin(e.target.value)}
                  InputProps={{ startAdornment: <InputAdornment position="start"><p style={{ fontSize: 15, color: `${NAVY}45` }}>EGP</p></InputAdornment> }}
                  sx={inputSx}
                />
                <TextField
                  required
                  fullWidth
                  size="small"
                  placeholder="50,000"
                  value={salaryMax} onChange={(e) => setSalaryMax(e.target.value)}
                  InputProps={{ startAdornment: <InputAdornment position="start"><p style={{ fontSize: 15, color: `${NAVY}45` }}>EGP</p></InputAdornment> }}
                  sx={inputSx}
                />
              </div>
            ) : (
              <div style={{
                background: "rgba(144,186,239,0.1)", border: `1.5px solid rgba(144,186,239,0.35)`,
                borderRadius: 14, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10,
              }}>
                <ForumOutlinedIcon sx={{ fontSize: 18, color: LIGHT_BLUE, flexShrink: 0 }} />
                <span style={{ color: NAVY, fontSize: 13, opacity: 0.72, lineHeight: 1.5 }}>
                  Salary will be discussed during the interview process.
                </span>
              </div>
            )}
          </div>

          {/* ── REQUIRED SKILLS ────────────────────────────────────────── */}
          <div>
            <FieldLabel>REQUIRED SKILLS</FieldLabel>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10, minHeight: 28 }}>
              {skills.map((skill) => (
                <Chip
                  key={skill} label={skill} size="small"
                  onDelete={() => handleRemoveSkill(skill)}
                  sx={{
                    background: "rgba(132,251,162,0.18)", color: NAVY, fontWeight: 600,
                    fontSize: 13, border: `1px solid rgba(132,251,162,0.5)`, borderRadius: "8px",
                    "& .MuiChip-deleteIcon": { color: `${NAVY}70`, "&:hover": { color: "#C32929" } },
                  }}
                />
              ))}
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              border: `1.5px solid rgba(19,32,109,0.18)`, borderRadius: 14,
              padding: "8px 14px", background: "white",
            }}>
              <AddIcon sx={{ fontSize: 15, color: `${NAVY}45` }} />
              <InputBase
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKey}
                placeholder="Type a skill and press Enter…"
                sx={{
                  flex: 1, fontSize: 14, color: NAVY, fontFamily: "'Inter', sans-serif",
                  "& input::placeholder": { color: `${NAVY}55`, opacity: 1 },
                }}
              />
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            RIGHT PANEL — Description fields + action buttons
            (mirrors the right form-panel of ApplyNowOverlay)
        ══════════════════════════════════════════════════════════════════ */}
        <div style={{ flex: 1, overflowY: "auto", padding: "36px 32px", position: "relative" }}>

          {/* Close button — absolute top-right */}
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

          <h2 style={{ color: NAVY, fontSize: 22, fontWeight: 700, margin: "0 0 28px" }}>
            Post a New Job
          </h2>
          {/* ── BANNER IMAGE ───────────────────────────────────── */}
          <div style={{ marginBottom: 20 }}>
            <FieldLabel>JOB BANNER IMAGE</FieldLabel>

            <label
              htmlFor="banner-upload"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 180,
                border: `2px dashed rgba(19,32,109,0.2)`,
                borderRadius: 16,
                cursor: "pointer",
                overflow: "hidden",
                background: "rgba(19,32,109,0.03)",
                transition: "0.2s",
              }}
            >
              {bannerPreview ? (
                <img
                  src={bannerPreview}
                  alt="Banner Preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    color: `${NAVY}70`,
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  Click to upload banner image
                </div>
              )}
            </label>

            <input
              id="banner-upload"
              type="file"
              accept="image/*"
              hidden
              onChange={handleBannerUpload}
            />
          </div>

          {/* ── ABOUT THE ROLE ───────────────────────────────────────── */}
          <div style={{ marginBottom: 22 }}>
            <FieldLabel>ABOUT THE ROLE</FieldLabel>
            <TextField
              required
              fullWidth
              multiline
              minRows={4}
              maxRows={6}
              placeholder="Describe the role and what a typical day looks like…"
              value={aboutRole}
              onChange={(e) => setAboutRole(e.target.value)}
              sx={inputSx}
            />
          </div>

          {/* ── RESPONSIBILITIES ─────────────────────────────────────── */}
          <div style={{ marginBottom: 22 }}>
            <FieldLabel>RESPONSIBILITIES</FieldLabel>
            <TextField
              required
              fullWidth
              multiline
              minRows={4}
              maxRows={6}
              placeholder={"List key responsibilities, one per line…\n• Build and maintain React applications\n• Collaborate with designers"}
              value={responsibilities}
              onChange={(e) => setResponsibilities(e.target.value)}
              sx={inputSx}
            />
          </div>

          {/* ── REQUIREMENTS ─────────────────────────────────────────── */}
          <div style={{ marginBottom: 28 }}>
            <FieldLabel>REQUIREMENTS</FieldLabel>
            <TextField
              required
              fullWidth
              multiline
              minRows={4}
              maxRows={6}
              placeholder={"List required qualifications, one per line…\n• 3+ years of React experience\n• Strong TypeScript skills"}
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              sx={inputSx}
            />
          </div>

          {/* ── POST JOB button (green gradient, same as ApplyNowOverlay) */}
          <Button
            fullWidth variant="contained"
            endIcon={<SendIcon />}
            onClick={handlePost}
            disabled={!isFormValid}
            sx={{
              py: 1.6, borderRadius: "14px",
              background: isFormValid
                ? `linear-gradient(135deg, ${GREEN} 0%, #6ef094 100%)`
                : "rgba(132,251,162,0.3)",
              color: NAVY, fontWeight: 700, fontSize: 16, textTransform: "none",
              boxShadow: jobTitle.trim() ? `0 4px 18px rgba(132,251,162,0.5)` : "none",
              "&:hover": {
                background: jobTitle.trim()
                  ? `linear-gradient(135deg, #6ef094 0%, ${GREEN} 100%)`
                  : "rgba(132,251,162,0.3)",
                boxShadow: jobTitle.trim() ? `0 6px 24px rgba(132,251,162,0.65)` : "none",
              },
              "&.Mui-disabled": { background: "rgba(132,251,162,0.25)", color: `${NAVY}55` },
            }}
          >
            Post Job
          </Button>

          {/* ── SAVE AS DRAFT button (outlined, same as ApplyNowOverlay) */}
          <Button
            fullWidth variant="outlined"
            startIcon={<BookmarkBorderIcon />}
            onClick={handleSaveDraft}
            sx={{
              mt: 1.5, py: 1.4, borderRadius: "14px",
              borderColor: "rgba(19,32,109,0.2)", color: NAVY,
              fontWeight: 700, fontSize: 15, textTransform: "none",
              "&:hover": { borderColor: NAVY, background: "rgba(19,32,109,0.04)" },
            }}
          >
            Save as Draft
          </Button>

          {/* Terms */}
          <p style={{ textAlign: "center", color: NAVY, opacity: 0.4, fontSize: 12, marginTop: 16, lineHeight: 1.6 }}>
            By clicking "Post Job" you agree to our{" "}
            <span style={{ color: LIGHT_BLUE, textDecoration: "underline", cursor: "pointer" }}>Posting Guidelines</span>
            {" "}and{" "}
            <span style={{ color: LIGHT_BLUE, textDecoration: "underline", cursor: "pointer" }}>Terms of Service</span>.
          </p>
        </div>

      </DialogContent>
    </Dialog>
  );
}
