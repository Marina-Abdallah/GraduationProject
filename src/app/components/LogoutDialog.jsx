import React, { useState } from "react";
import { Dialog, DialogContent, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export function LogoutDialog({ open, onClose, type }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (token) {
        const logoutPath = profileType === "company" ? "/Companies/logout" : "/Users/logout";
        await api.post(
          logoutPath,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      setIsSubmitting(false);
      onClose();
      navigate("/");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "24px",
          overflow: "hidden",
          maxWidth: 520,
          width: "100%",
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Box
          sx={{
            bgcolor: "#90baef",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "40px",
            p: "48px 32px",
          }}
        >
          {/* Question text */}
          <Typography
            sx={{
              color: "#13206d",
              fontSize: { xs: "32px", sm: "44px" },
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              textAlign: "center",
              lineHeight: 1.25,
            }}
          >
            Are you sure you
            <br />
            want to log out?
          </Typography>

          {/* Buttons */}
          <Box sx={{ display: "flex", gap: "48px", alignItems: "center" }}>
            {/* NO — green */}
            <Button
              onClick={onClose}
              disabled={isSubmitting}
              sx={{
                bgcolor: "#84fba2",
                color: "#13206d",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: "18px",
                borderRadius: "20px",
                width: "160px",
                height: "52px",
                textTransform: "none",
                "&:hover": { bgcolor: "#6ef094" },
              }}
            >
              NO
            </Button>

            {/* Yes — red */}
            <Button
              onClick={handleConfirm}
              disabled={isSubmitting}
              sx={{
                bgcolor: "#ff383c",
                color: "white",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: "18px",
                borderRadius: "20px",
                width: "160px",
                height: "52px",
                textTransform: "none",
                "&:hover": { bgcolor: "#e02020" },
              }}
            >
              Yes
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
