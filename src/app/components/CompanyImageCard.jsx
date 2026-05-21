import React, { useRef, useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { useAppContext } from "./AppContext";
import api from "../../api/axios";
import defaultPhoto from "../../assets/defaultImg.png";

export function CompanyImageCard() {
  const { company, updateCompany } = useAppContext();
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const getCompanyUploadInfo = async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const uploadPath = "/Companies/me/overview/photo";

    return { uploadPath, token };
  };

  const postFileToUrl = async (uploadInfo, file) => {
    const { uploadPath, token } = uploadInfo;

    const formData = new FormData();
    formData.append("photo", file);

    const response = await api.post(uploadPath, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response?.data;
  };

  const fetchCompanyPhoto = async (companyId) => {
    const token = localStorage.getItem("token");
    if (!token || !companyId) return null;

    try {
      const response = await api.get(`/Companies/${companyId}/photo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      });

      if (response?.data && response.data.size > 0) {
        return URL.createObjectURL(response.data);
      }
    } catch (err) {
      console.warn("Could not fetch photo blob:", err);
    }

    return null;
  };

  const fetchUpdatedCompany = async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const response = await api.get("/Companies/me/overview", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      e.target.value = "";
      return;
    }

    setUploading(true);

    try {
      const uploadInfo = await getCompanyUploadInfo();
      const uploadResponse = await postFileToUrl(uploadInfo, file);

      let photoUrl = null;

      if (uploadResponse) {
        if (typeof uploadResponse === "string") {
          photoUrl = uploadResponse;
        } else if (uploadResponse.pictureUrl) {
          photoUrl = uploadResponse.pictureUrl;
        } else if (uploadResponse.photoUrl) {
          photoUrl = uploadResponse.photoUrl;
        } else if (uploadResponse.url) {
          photoUrl = uploadResponse.url;
        }
      }

      if (!photoUrl) {
        const companyData = await fetchUpdatedCompany();
        if (companyData?.id) {
          photoUrl = await fetchCompanyPhoto(companyData.id);
        }
        if (!photoUrl) {
          photoUrl = companyData?.pictureUrl || companyData?.photoUrl;
          if (photoUrl && !photoUrl.startsWith("http")) {
            photoUrl = `https://localhost:7292${photoUrl}`;
          }
        }
      }

      if (photoUrl) {
        if (!photoUrl.startsWith("http") && !photoUrl.startsWith("blob:")) {
          photoUrl = `https://localhost:7292${photoUrl}`;
        }
        updateCompany({ photo: photoUrl });
      } else {
        updateCompany({ photo: URL.createObjectURL(file) });
      }
    } catch (error) {
      console.error("Failed to upload company photo", error);
      updateCompany({ photo: URL.createObjectURL(file) });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
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
        Company Photo
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
          src={company.photo || defaultPhoto}
          alt="Company Logo"
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: uploading ? 0.5 : 1 }}
        />
        {uploading && (
          <CircularProgress
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-20px",
              marginLeft: "-20px",
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
            color: "#9e9e9e",
          },
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
