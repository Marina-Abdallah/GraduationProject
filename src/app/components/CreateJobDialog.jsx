import React, { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Popper from "@mui/material/Popper";
import Autocomplete from "@mui/material/Autocomplete";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useAppContext } from "../components/AppContext";
import defaultPhoto from "../../assets/defaultCompanyImg.png";
import api from "../../api/axios";

// ── Brand colors ─────────────────────────────────────────────────────────────
const NAVY = "#13206d";
const GREEN = "#84fba2";
const LIGHT_BLUE = "#90baef";

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
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [jobTitle, setJobTitle] = useState("");

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  const [locationModes, setLocationModes] = useState([]);
  const [locationMode, setLocationMode] = useState("");

  const [jobTypes, setJobTypes] = useState([]);
  const [jobType, setJobType] = useState("");

  const [loadingMetadata, setLoadingMetadata] = useState(true);
  const [city, setCity] = useState("");

  const [allSkills, setAllSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
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

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setLoadingMetadata(true);
        const token = localStorage.getItem("token");

        console.log("Token:", token);

        const [categoriesRes, jobTypesRes, locationModesRes, skillsRes] =
          await Promise.all([
            api.get("/Jobs/categories", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
            api.get("/Jobs/job-types", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
            api.get("/Jobs/location-modes", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
            api.get("/Users/skills", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
          ]);

        console.log("Categories:", categoriesRes.data);
        console.log("Job Types:", jobTypesRes.data);
        console.log("Location Modes:", locationModesRes.data);
        console.log("Skills:", skillsRes.data);

        setCategories(categoriesRes.data || []);
        setJobTypes(jobTypesRes.data || []);
        setLocationModes(locationModesRes.data || []);
        setAllSkills(skillsRes.data || []);
        // Set defaults from API
        if (categoriesRes.data?.length) {
          setCategory(categoriesRes.data[0].id);
        }

        if (jobTypesRes.data?.length) {
          setJobType(jobTypesRes.data[0].id);
        }

        if (locationModesRes.data?.length) {
          setLocationMode(locationModesRes.data[0].id);
        }
      } catch (err) {
        console.error("Failed to load job metadata", err);
      } finally {
        setLoadingMetadata(false);
      }
    };

    if (open) {
      fetchMetadata();
    }
  }, [open]);

  useEffect(() => {

    if (!searchQuery.trim()) {
      setOptions([]);
      return;
    }

    const filtered = allSkills.filter(skill => {

      const name =
        skill.name ||
        skill.skillName ||
        skill.title ||
        "";

      const skillId = skill.id || skill.skillId;

      return (
        name
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
        &&
        !selectedSkills.some(
          s => (s.id || s.skillId) === skillId
        )
      );

    });


    setOptions(filtered);

  }, [searchQuery, allSkills, selectedSkills]);

  const handleAddMore = () => {
    setShowInput((prev) => !prev);
    setSearchQuery("");
    setSelectedSkill(null);
  };

  const handleAddSkill = (skill) => {
    const targetSkill = skill || selectedSkill;
    if (targetSkill) {
      const skillId = targetSkill.id || targetSkill.skillId;
      const skillName = targetSkill.name || targetSkill.skillName || targetSkill.title || "Skill";

      if (!selectedSkills.some(s => (s.id || s.skillId) === skillId)) {
        setSelectedSkills(prev => [...prev, { id: skillId, name: skillName }]);
      }
      setSelectedSkill(null);
      setSearchQuery("");
      setShowInput(false);
    }
  };

  const handleDeleteSkill = (skillObj) => {
    const skillId = skillObj.id || skillObj.skillId;
    setSelectedSkills(prev => prev.filter(s => (s.id || s.skillId) !== skillId));
  };

  // ── Skills helpers ────────────────────────────────────────────────────────

  const handleSkillKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (options.length > 0) {
        handleAddSkill(options[0]);
      }
    }
  };

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
    setJobTitle(""); setCategory(categories[0]?.id || ""); setLocationMode(locationModes[0]?.id || ""); setJobType(jobTypes[0]?.id || ""); setCity("");
    setSkillInput("");
    setSelectedSkills([]);
    setSalaryType("range"); setSalaryMin(""); setSalaryMax("");
    setAboutRole(""); setShortDesc(""); setResponsibilities(""); setRequirements("");
    setBannerImage(null);
    setBannerPreview("");
  };

  const isFormValid =
    jobTitle.trim() &&
    category &&
    shortDesc.trim() &&
    locationMode &&
    jobType &&
    city.trim() &&
    bannerImage &&
    aboutRole.trim() &&
    responsibilities.trim() &&
    requirements.trim() &&
    (
      salaryType === "discuss" ||
      (salaryMin.trim() && salaryMax.trim())
    );

  const handlePost = async () => {
    if (!isFormValid || submitting) return;
    setSubmitting(true);
    setSubmitError(null);

    try {
      const token = localStorage.getItem("token");
      const isSalaryInInterview = salaryType === "discuss";

      const formData = new FormData();
      formData.append("Title", jobTitle.trim());
      formData.append("ShortDescription", shortDesc.trim());
      formData.append("JobCategoryId", category);
      formData.append("LocationModeId", locationMode);
      formData.append("JobTypeId", jobType);
      formData.append("CityOffice", city.trim());
      formData.append("IsSalaryInInterview", isSalaryInInterview ? "true" : "false");
      formData.append("AboutRole", aboutRole.trim());
      formData.append("Responsibilities", responsibilities.trim());
      formData.append("Requirements", requirements.trim());

      if (!isSalaryInInterview) {
        if (salaryMin) formData.append("SalaryFrom", Number(salaryMin).toString());
        if (salaryMax) formData.append("SalaryTo", Number(salaryMax).toString());
      }

      if (bannerImage) {
        formData.append("bannerImage", bannerImage);
      }

      // ── REQUIRED SKILLS ──
      selectedSkills.forEach((skill) => {
        formData.append(
          "RequiredSkillIds",
          (skill.id || skill.skillId).toString()
        );
      });

      // ── Diagnostic: log every field being sent ────────────────────────
      console.group("POST /Jobs — FormData fields");
      for (const [key, value] of formData.entries()) {
        console.log(`  ${key}:`, value instanceof File ? `[File: ${value.name} (${value.size} bytes)]` : value);
      }
      console.groupEnd();

      const response = await api.post("/Jobs", formData, {
        headers: {
          // Do NOT set Content-Type manually — axios will set it automatically
          // with the correct multipart boundary
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      onSubmit?.({
        ...response.data,
        // Augment with form-state values the API response may not return
        _formCategory: category,
      });
      resetForm();
      onClose();
    } catch (err) {
      // ── Diagnostic: dump the full server error ────────────────────────
      console.group("POST /Jobs — Server Error");
      console.error("Status:", err.response?.status);
      console.error("Headers:", err.response?.headers);
      console.error("Body:", err.response?.data);
      console.error("Full error:", err);
      console.groupEnd();

      const responseData = err.response?.data;
      const errorMessage =
        responseData?.errors
          ? Object.values(responseData.errors).flat().join(" | ")
          : responseData?.message ||
          responseData?.title ||
          (typeof responseData === "string" ? responseData : null) ||
          "Failed to post job. Please try again.";
      setSubmitError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };
  const handleSaveDraft = () => { resetForm(); onClose(); };
  const handleClose = () => { if (submitting) return; resetForm(); setSubmitError(null); onClose(); };
  const FixedTopPopper = (props) => (
    <Popper
      {...props}
      placement="top-start"
      modifiers={[
        {
          name: "flip",
          enabled: false,
        },
      ]}
    />
  );

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
              {categories.map((c) => (
                <MenuItem
                  key={c.id}
                  value={c.id}
                  sx={{ fontSize: 14, color: NAVY }}
                >
                  {c.name}
                </MenuItem>
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
              inputProps={{ maxLength: 100 }}
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
              {jobTypes.map((type) => (
                <MenuItem
                  key={type.id}
                  value={type.id}
                  sx={{ fontSize: 14, color: NAVY }}
                >
                  {type.name}
                </MenuItem>
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
              {locationModes.map((mode, i) => (
                <div
                  key={mode.id}
                  onClick={() => setLocationMode(mode.id)}
                  style={{
                    flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: locationMode === mode.id ? 700 : 500,
                    fontFamily: "'Inter', sans-serif", cursor: "pointer",
                    background: locationMode === mode.id ? GREEN : "transparent",
                    color: locationMode === mode.id ? NAVY : `${NAVY}70`,
                    borderRight: i < locationModes.length - 1 ? "1px solid rgba(19,32,109,0.1)" : "none",
                    transition: "all 0.15s", userSelect: "none",
                  }}
                >
                  {mode.name}
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
          <FieldLabel>REQUIRED SKILLS</FieldLabel>

          <Autocomplete
            multiple
            options={allSkills}
            value={selectedSkills}
            onChange={(e, newValue) =>
              setSelectedSkills(newValue)
            }
            disableCloseOnSelect
            filterSelectedOptions
            renderTags={() => null}   // hide chips inside input
            getOptionLabel={(option) =>
              option.name ||
              option.skillName ||
              option.title ||
              ""
            }
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search skills..."
                sx={inputSx}
              />
            )}
            slots={{
              popper: FixedTopPopper,
            }}
          />

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              //marginBottom: 10,
              marginTop: 10,
            }}
          >
            {selectedSkills.map((skill) => (
              <Chip
                key={skill.id || skill.skillId}
                label={
                  skill.name ||
                  skill.skillName ||
                  skill.title
                }
                onDelete={() =>
                  setSelectedSkills((prev) =>
                    prev.filter(
                      (s) =>
                        (s.id || s.skillId) !==
                        (skill.id || skill.skillId)
                    )
                  )
                }
                sx={{
                  background: "rgba(132,251,162,0.18)", color: NAVY, fontWeight: 600,
                  fontSize: 13, border: `1px solid rgba(132,251,162,0.5)`, borderRadius: "8px",
                  "& .MuiChip-deleteIcon": { color: `${NAVY}70`, "&:hover": { color: "#C32929" } },
                }}
              />
            ))}
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

          {/* ── Error message ──────────────────────────────────────────── */}
          {submitError && (
            <div style={{
              background: "rgba(195,41,41,0.08)",
              border: "1.5px solid rgba(195,41,41,0.25)",
              borderRadius: 12,
              padding: "10px 14px",
              marginBottom: 14,
              color: "#C32929",
              fontSize: 13,
              fontFamily: "'Inter', sans-serif",
              lineHeight: 1.5,
            }}>
              {submitError}
            </div>
          )}

          {/* ── POST JOB button (green gradient, same as ApplyNowOverlay) */}
          <Button
            fullWidth variant="contained"
            endIcon={submitting ? <CircularProgress size={18} sx={{ color: NAVY }} /> : <SendIcon />}
            onClick={handlePost}
            disabled={!isFormValid || submitting}
            sx={{
              py: 1.6, borderRadius: "14px",
              background: isFormValid && !submitting
                ? `linear-gradient(135deg, ${GREEN} 0%, #6ef094 100%)`
                : "rgba(132,251,162,0.3)",
              color: NAVY, fontWeight: 700, fontSize: 16, textTransform: "none",
              boxShadow: jobTitle.trim() ? `0 4px 18px rgba(132,251,162,0.5)` : "none",
              "&:hover": {
                background: jobTitle.trim() && !submitting
                  ? `linear-gradient(135deg, #6ef094 0%, ${GREEN} 100%)`
                  : "rgba(132,251,162,0.3)",
                boxShadow: jobTitle.trim() ? `0 6px 24px rgba(132,251,162,0.65)` : "none",
              },
              "&.Mui-disabled": { background: "rgba(132,251,162,0.25)", color: `${NAVY}55` },
            }}
          >
            {submitting ? "Posting…" : "Post Job"}
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
