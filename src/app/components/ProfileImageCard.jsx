import React, { useRef, useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { useAppContext } from "./AppContext";
import api from "../../api/axios";
import defaultPhoto from "../../assets/defaultImg.png";

export function ProfileImageCard() {
  const { profile, updateProfile } = useAppContext();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const formData = new FormData();
        formData.append("photo", file);

        // Call the upload API endpoint (adjust endpoint name if different)
        const response = await api.post("/Users/me/profile/photo", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          }
        });

        // Fetch the updated profile photo from the DB
        let userId = localStorage.getItem("userId");
        if (userId === "undefined" || userId === "null") userId = null;

        if (userId) {
          try {
            const photoRes = await api.get(`/Users/${userId}/photo`, {
              headers: { Authorization: `Bearer ${token}` },
              responseType: 'blob'
            });

            if (photoRes.data && photoRes.data.size > 0) {
              const photoUrl = URL.createObjectURL(photoRes.data);
              updateProfile({ photo: photoUrl });
            }
          } catch (photoErr) {
            console.warn("Could not fetch updated photo blob:", photoErr);

            // Fallback to local optimistic update if fetching fails
            const localUrl = URL.createObjectURL(file);
            updateProfile({ photo: localUrl });
          }
        } else {
          // Fallback if userId is missing
          const localUrl = URL.createObjectURL(file);
          updateProfile({ photo: localUrl });
        }
      } catch (error) {
        console.error("Failed to upload photo", error);
      } finally {
        setUploading(false);
      }
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
          position: "relative",
        }}
      >
        <img
          src={profile.photo || defaultPhoto}
          alt="Profile"
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: uploading ? 0.5 : 1 }}
        />
        {uploading && (
          <CircularProgress
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-20px",
              marginLeft: "-20px"
            }}
          />
        )}
      </Box>

      {/* Upload Button */}
      <Button
        onClick={handleUploadClick}
        disabled={uploading}
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
          "&.Mui-disabled": {
            bgcolor: "#e0e0e0",
            color: "#9e9e9e"
          }
        }}
      >
        {uploading ? "Uploading..." : "Upload New"}
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
