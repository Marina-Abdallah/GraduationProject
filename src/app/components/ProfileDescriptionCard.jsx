import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  LinearProgress,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckIcon from "@mui/icons-material/Check";
import { useAppContext } from "./AppContext";
import api from "../../api/axios";

const inputFieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    bgcolor: "rgba(255,255,255,0.55)",
    "& fieldset": { borderColor: "rgba(19,32,109,0.2)" },
    "&:hover fieldset": { borderColor: "#84fba2" },
    "&.Mui-focused fieldset": { borderColor: "#13206d" },
  },
  "& input, & textarea": {
    color: "rgba(19,32,109,0.75)",
    fontFamily: "'Inter', sans-serif",
    fontSize: "14px",
  },
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "rgba(19,32,109,0.75)",
  },
};

const labelSx = {
  color: "#13206d",
  fontSize: "15px",
  fontWeight: 600,
  fontFamily: "'Inter', sans-serif",
  mb: "4px",
};

export function ProfileDescriptionCard() {
  const { profile, updateProfile } = useAppContext();
  const [editMode, setEditMode] = useState(false);
  const [draft, setDraft] = useState({});
  const [scoring, setScoring] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleEdit = () => {
    setDraft({
      bio: profile.bio,
      headline: profile.headline,
      major: profile.major,
    });
    setEditMode(true);
  };

  const handleSave = () => {
    updateProfile(draft);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
    setDraft({});
  };

  const val = (key) => (editMode ? draft[key] : profile[key]) ?? "";
  const set = (key) => (e) => setDraft((prev) => ({ ...prev, [key]: e.target.value }));

  const handleResumeUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      updateProfile({ resumeFileName: file.name, resumeScore: 0 });
    }
    e.target.value = "";
  };

  const handleScoreIt = async () => {
    if (!profile.resumeFileName || !selectedFile) return;
    setScoring(true);
    
    try {
      const token = localStorage.getItem("token");
      let userId = "";
      if (token) {
        try {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          const decoded = JSON.parse(jsonPayload);
          userId = decoded.sub || decoded.nameid || decoded.id || decoded.UserId || decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || "";
        } catch(e) {
          console.error("Failed to decode token", e);
        }
      }

      const formData = new FormData();
      formData.append("File", selectedFile);
      if (userId) formData.append("UserId", userId);
      formData.append("jobDescription", profile.headline || profile.major || "General Profile");

      const response = await api.post("/cv/upload-and-evaluate", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log("CV Evaluate response:", response.data);
      const returnedScore = response.data?.score ?? response.data?.percentage ?? response.data?.ResumeScore ?? response.data?.scorePercentage ?? 85;

      // Prefer a server-provided CV URL/path if returned, otherwise fall back to the filename
      const returnedCvUrl = response.data?.cvUrl ?? response.data?.fileUrl ?? response.data?.filePath ?? response.data?.path ?? response.data?.url ?? response.data?.cvPath ?? response.data?.FileUrl ?? response.data?.FilePath ?? selectedFile.name;

      updateProfile({ resumeScore: returnedScore, resumeFileName: returnedCvUrl });
    } catch (err) {
      console.error("Error uploading CV:", err.response?.data || err.message);
      alert("Failed to score CV. Please check console for details.");
    } finally {
      setScoring(false);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "#fafafa",
        borderRadius: "16px",
        p: "28px 24px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        boxShadow: "0px 8px 8px 0px rgba(132,251,162,0.5)",
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 1 }}>
        <Typography
          sx={{
            color: "#13206d",
            fontSize: "28px",
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Profile description
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          {editMode ? (
            <>
              <Button
                onClick={handleSave}
                startIcon={<CheckIcon />}
                sx={{
                  bgcolor: "#84fba2",
                  color: "#13206d",
                  fontWeight: 600,
                  borderRadius: "8px",
                  px: 3,
                  textTransform: "none",
                  "&:hover": { bgcolor: "#6ef094" },
                }}
              >
                Save
              </Button>
              <Button
                onClick={handleCancel}
                sx={{
                  bgcolor: "transparent",
                  color: "#13206d",
                  borderRadius: "8px",
                  border: "1px solid rgba(19,32,109,0.3)",
                  px: 2,
                  textTransform: "none",
                  "&:hover": { bgcolor: "rgba(19,32,109,0.05)" },
                }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              onClick={handleEdit}
              startIcon={<EditOutlinedIcon />}
              sx={{
                bgcolor: "#84fba2",
                color: "#13206d",
                fontWeight: 500,
                borderRadius: "8px",
                px: 3,
                textTransform: "none",
                "&:hover": { bgcolor: "#6ef094" },
              }}
            >
              Edit Profile Description
            </Button>
          )}
        </Box>
      </Box>

      {/* Bio */}
      <Box>
        <Typography sx={labelSx}>Bio</Typography>
        <TextField
          fullWidth
          multiline
          minRows={3}
          maxRows={6}
          disabled={!editMode}
          value={val("bio")}
          onChange={set("bio")}
          sx={inputFieldSx}
        />
      </Box>

      {/* Headline + Major */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography sx={labelSx}>Headline</Typography>
          <TextField
            fullWidth
            size="small"
            disabled={!editMode}
            value={val("headline")}
            onChange={set("headline")}
            sx={inputFieldSx}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography sx={labelSx}>Major</Typography>
          <TextField
            fullWidth
            size="small"
            disabled={!editMode}
            value={val("major")}
            onChange={set("major")}
            sx={inputFieldSx}
          />
        </Grid>
      </Grid>

      {/* Resume */}
      <Box>
        <Typography sx={labelSx}>My Resume</Typography>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Box
            onClick={() => fileInputRef.current?.click()}
            sx={{
              flex: 1,
              height: "44px",
              borderRadius: "8px",
              bgcolor: "rgba(255,255,255,0.55)",
              border: "1px solid rgba(19,32,109,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2,
              cursor: "pointer",
              "&:hover": { borderColor: "#84fba2" },
            }}
          >
            <Typography
              sx={{
                color: profile.resumeFileName ? "rgba(19,32,109,0.75)" : "rgba(19,32,109,0.4)",
                fontSize: "14px",
                fontFamily: "'Inter', sans-serif",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                flex: 1,
              }}
            >
              {profile.resumeFileName || "Upload Your Resume to score it"}
            </Typography>
            <Typography
              sx={{
                color: "rgba(19,32,109,0.5)",
                fontSize: "14px",
                fontFamily: "'Inter', sans-serif",
                ml: 2,
                flexShrink: 0,
              }}
            >
              {profile.resumeScore}%
            </Typography>
          </Box>

          <Button
            onClick={handleScoreIt}
            disabled={!profile.resumeFileName || scoring}
            sx={{
              bgcolor: "#84fba2",
              color: "#13206d",
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              borderRadius: "8px",
              px: 3,
              height: "44px",
              textTransform: "none",
              flexShrink: 0,
              "&:hover": { bgcolor: "#6ef094" },
              "&.Mui-disabled": { bgcolor: "rgba(132,251,162,0.4)", color: "#13206d" },
            }}
          >
            {scoring ? "Scoring…" : "Score it"}
          </Button>
        </Box>

        {/* Progress bar shown when score > 0 */}
        {profile.resumeScore > 0 && (
          <Box sx={{ mt: 1 }}>
            <LinearProgress
              variant="determinate"
              value={profile.resumeScore}
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: "rgba(19,32,109,0.1)",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 3,
                  bgcolor: "#84fba2",
                },
              }}
            />
            <Typography sx={{ color: "#13206d", fontSize: "12px", mt: 0.5, opacity: 0.7 }}>
              CV Score: {profile.resumeScore}%
            </Typography>
          </Box>
        )}
      </Box>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        style={{ display: "none" }}
        onChange={handleResumeUpload}
      />
    </Box>
  );
}