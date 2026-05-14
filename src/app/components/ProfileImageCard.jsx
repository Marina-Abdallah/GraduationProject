import React, { useRef } from "react";
import { Box, Typography, Button } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { useAppContext } from "./AppContext";
import defaultPhoto from "../../assets/defaultImg.png";

export function ProfileImageCard() {
  const { profile, updateProfile } = useAppContext();
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updateProfile({ photo: url });
    }
    // reset so same file can be re-selected
    e.target.value = "";
  };

  return (
    <Box
      sx={{
        bgcolor: "#fafafa",
        borderRadius: "16px",
        p: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        boxShadow: "0px 8px 8px 0px rgba(132,251,162,0.5)",
      }}
    >
      <Typography
        sx={{
          color: "#13206d",
          fontSize: "28px",
          fontWeight: 600,
          fontFamily: "'Inter', sans-serif",
          textAlign: "center",
        }}
      >
        Your Photo
      </Typography>

      {/* Profile Image */}
      <Box
        sx={{
          width: 180,
          height: 180,
          borderRadius: "50%",
          overflow: "hidden",
          flexShrink: 0,
          boxShadow: "0px 4px 12px rgba(132,251,162,0.5)",
          border: "3px solid #84fba2",
        }}
      >
        <img
          src={profile.photo || defaultPhoto}
          alt="Profile"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>

      {/* Upload Button */}
      <Button
        onClick={handleUploadClick}
        startIcon={<CloudUploadOutlinedIcon />}
        sx={{
          bgcolor: "#84fba2",
          color: "#13206d",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          fontSize: "16px",
          borderRadius: "8px",
          px: 4,
          py: 1,
          width: "100%",
          maxWidth: "200px",
          textTransform: "none",
          "&:hover": { bgcolor: "#6ef094" },
        }}
      >
        Upload New
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </Box>
  );
}
