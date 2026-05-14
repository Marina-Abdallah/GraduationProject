import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckIcon from "@mui/icons-material/Check";
import { useAppContext } from "./AppContext";

const inputFieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    bgcolor: "rgba(255,255,255,0.55)",
    "& fieldset": { borderColor: "rgba(19,32,109,0.2)" },
    "&:hover fieldset": { borderColor: "#84fba2" },
    "&.Mui-focused fieldset": { borderColor: "#13206d" },
  },
  "& input": {
    color: "rgba(19,32,109,0.75)",
    fontFamily: "'Inter', sans-serif",
    fontSize: "14px",
    py: "10px",
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

export function PersonalInfoCard() {
  const { profile, updateProfile } = useAppContext();
  const [editMode, setEditMode] = useState(false);
  const [draft, setDraft] = useState({});

  const handleEdit = () => {
    setDraft({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      birthdate: profile.birthdate,
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

  return (
    <Box
      sx={{
        bgcolor: "#fafafa",
        borderRadius: "16px",
        p: "28px 24px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        boxShadow: "0px 8px 8px 0px rgba(132,251,162,0.5)",
      }}
    >
      {/* Header row */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 1 }}>
        <Typography
          sx={{
            color: "#13206d",
            fontSize: "28px",
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Personal information
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
                  fontFamily: "'Inter', sans-serif",
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
                  fontWeight: 500,
                  fontFamily: "'Inter', sans-serif",
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
                fontFamily: "'Inter', sans-serif",
                borderRadius: "8px",
                px: 3,
                textTransform: "none",
                "&:hover": { bgcolor: "#6ef094" },
              }}
            >
              Edit Personal Information
            </Button>
          )}
        </Box>
      </Box>

      {/* Fields Grid */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography sx={labelSx}>Full Name</Typography>
          <TextField
            fullWidth
            size="small"
            disabled={!editMode}
            value={val("name")}
            onChange={set("name")}
            sx={inputFieldSx}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography sx={labelSx}>Email Address</Typography>
          <TextField
            fullWidth
            size="small"
            disabled={!editMode}
            value={val("email")}
            onChange={set("email")}
            sx={inputFieldSx}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography sx={labelSx}>Phone Number</Typography>
          <TextField
            fullWidth
            size="small"
            disabled={!editMode}
            value={val("phone")}
            onChange={set("phone")}
            sx={inputFieldSx}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography sx={labelSx}>Birthdate</Typography>
          <TextField
            fullWidth
            size="small"
            disabled={!editMode}
            value={val("birthdate")}
            onChange={set("birthdate")}
            sx={inputFieldSx}
          />
        </Grid>
      </Grid>
    </Box>
  );
}