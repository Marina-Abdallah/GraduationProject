import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Divider,
  Tooltip,
  Avatar
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SendIcon from "@mui/icons-material/Send";
import { useAppContext } from "../components/AppContext";
import ProfiledefaultPhoto from "../../assets/defaultImg.png";
import defaultPhoto from "../../assets/defaultCompanyImg.png";


const NAVY = "#13206d";
const GREEN = "#84fba2";
const LIGHT_BLUE = "#90baef";


export function WritePostDialog({ open, onClose, onSubmit, profileType }) {
  const { company, profile } = useAppContext();
  const [content, setContent] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaUrl, setMediaUrl] = useState(null);
  const fileInputRef = useRef(null);

  const isCompany = profileType === "company";

  const displayName = isCompany
    ? company?.name || "[Company Name]"
    : profile?.name || "[User Name]";

  const displayRole = isCompany
    ? company?.industry || "[Industry]"
    : profile?.headline || "[Headline]";

  const displayPhoto = isCompany
    ? company?.photo || defaultPhoto
    : profile?.photo || ProfiledefaultPhoto;

  const placeholderText = isCompany
    ? `What's on your mind, ${displayName}?`
    : `Share your thoughts, ${displayName}...`;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setMediaFile(file);
      setMediaUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveMedia = () => {
    setMediaFile(null);
    setMediaUrl(null);
  };

  const handleSubmit = () => {
    if (!content.trim() && !mediaFile) return;
    onSubmit?.(content.trim(), mediaFile);
    setContent("");
    setMediaFile(null);
    setMediaUrl(null);
    onClose();
  };

  const handleClose = () => {
    setContent("");
    setMediaFile(null);
    setMediaUrl(null);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "24px",
          boxShadow: "0px 8px 40px rgba(132,251,162,0.35), 0 12px 40px rgba(0,0,0,0.12)",
          overflow: "hidden",
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 3,
              pt: 3,
              pb: 1.5,
            }}
          >
            <Box sx={{ flex: 1 }} />
            <Typography
              sx={{
                color: NAVY,
                fontWeight: 800,
                fontSize: 26,
                fontFamily: "'Inter', sans-serif",
                flex: 1,
                textAlign: "center",
              }}
            >
              Create Post
            </Typography>
            <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
              <Tooltip title="Close">
                <IconButton
                  onClick={handleClose}
                  sx={{
                    border: "1.5px solid #FF383C",
                    borderRadius: "8px",
                    width: 30,
                    height: 30,
                    color: "#FF383C",
                    "&:hover": { bgcolor: "rgba(255,56,60,0.06)" },
                  }}
                >
                  <CloseIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* Divider */}
          <Divider sx={{ borderColor: `${NAVY}30`, mx: 3 }} />

          {/* Post area */}
          <Box
            sx={{
              mx: 2,
              mt: 2,
              bgcolor: "white",
              borderRadius: "20px",
              boxShadow: "0px 8px 4px rgba(132,251,162,0.3)",
              border: "1px solid rgba(132,251,162,0.2)",
              minHeight: 260,
              display: "flex",
              flexDirection: "column",
              p: "16px 20px",
              gap: 2,
            }}
          >
            {/* Company identity */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {/* <MSLogo size={52} /> */}
              <Avatar
                src={displayPhoto}
                alt={displayName}
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
              <Box>
                <Typography
                  sx={{
                    color: NAVY,
                    fontWeight: 700,
                    fontSize: 18,
                    fontFamily: "'Inter', sans-serif",
                    lineHeight: 1.3,
                  }}
                >
                  {displayName}
                </Typography>
                <Typography
                  sx={{
                    color: NAVY,
                    fontSize: 14,
                    opacity: 0.7,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {displayRole}
                </Typography>
              </Box>
            </Box>

            {/* Text area */}
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={placeholderText}
              style={{
                flex: 1,
                minHeight: 140,
                resize: "none",
                border: "none",
                outline: "none",
                fontFamily: "'Inter', sans-serif",
                fontSize: 17,
                color: NAVY,
                background: "transparent",
                lineHeight: 1.6,
                width: "100%",
              }}
            />

            {/* Media preview */}
            {mediaUrl && (
              <Box sx={{ position: "relative", borderRadius: "12px", overflow: "hidden" }}>
                <img
                  src={mediaUrl}
                  alt="media"
                  style={{
                    width: "100%",
                    maxHeight: 180,
                    objectFit: "cover",
                    display: "block",
                    borderRadius: 12,
                  }}
                />
                <IconButton
                  size="small"
                  onClick={handleRemoveMedia}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    bgcolor: "rgba(0,0,0,0.55)",
                    color: "white",
                    width: 26,
                    height: 26,
                    "&:hover": { bgcolor: "rgba(0,0,0,0.75)" },
                  }}
                >
                  <CloseIcon sx={{ fontSize: 14 }} />
                </IconButton>
              </Box>
            )}
          </Box>

          {/* Bottom toolbar */}
          <Box
            sx={{
              mx: 2,
              mt: 1.5,
              mb: 2,
              bgcolor: "white",
              borderRadius: "16px",
              boxShadow: "0px 4px 8px rgba(132,251,162,0.3)",
              border: "1px solid rgba(132,251,162,0.25)",
              px: 2,
              py: 1.2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                color: NAVY,
                fontSize: 16,
                fontFamily: "'Inter', sans-serif",
                opacity: 0.85,
              }}
            >
              Add to your post
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* Image upload */}
              <Tooltip title="Add image / video">
                <IconButton
                  size="small"
                  onClick={() => fileInputRef.current?.click()}
                  sx={{
                    color: NAVY,
                    "&:hover": { color: LIGHT_BLUE, bgcolor: "rgba(144,186,239,0.1)" },
                  }}
                >
                  <ImageOutlinedIcon sx={{ fontSize: 24 }} />
                </IconButton>
              </Tooltip>

              {/* Tag someone */}
              <Tooltip title="Tag someone">
                <IconButton
                  size="small"
                  sx={{
                    color: NAVY,
                    "&:hover": { color: LIGHT_BLUE, bgcolor: "rgba(144,186,239,0.1)" },
                  }}
                >
                  <PersonAddOutlinedIcon sx={{ fontSize: 24 }} />
                </IconButton>
              </Tooltip>

              {/* Post button */}
              <Box
                onClick={handleSubmit}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.8,
                  bgcolor: content.trim() || mediaFile ? GREEN : "rgba(132,251,162,0.35)",
                  color: NAVY,
                  fontWeight: 700,
                  fontSize: 14,
                  fontFamily: "'Inter', sans-serif",
                  px: 2,
                  py: 0.7,
                  borderRadius: "20px",
                  cursor: content.trim() || mediaFile ? "pointer" : "default",
                  "&:hover": {
                    bgcolor: content.trim() || mediaFile ? "#6ef094" : "rgba(132,251,162,0.35)",
                  },
                  transition: "background 0.2s",
                  userSelect: "none",
                  border: "1.5px solid rgba(132,251,162,0.6)",
                }}
              >
                <AddCircleOutlineIcon sx={{ fontSize: 16 }} />
                <span>Post</span>
              </Box>
            </Box>
          </Box>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
}
