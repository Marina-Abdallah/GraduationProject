import React from "react";
import { Dialog, Box, Typography, Button } from "@mui/material";

const NAVY       = "#13206d";
const GREEN      = "#84fba2";
const LIGHT_BLUE = "#90baef";

export function RejectDialog({ open, applicantName, onConfirm, onCancel }) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(19,32,109,0.25)",
        },
      }}
    >
      <Box
        sx={{
          bgcolor: LIGHT_BLUE,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          p: { xs: "36px 24px", sm: "52px 60px" },
          textAlign: "center",
        }}
      >
        {/* Message */}
        <Typography
          sx={{
            color: NAVY,
            fontSize: { xs: 22, sm: 28, md: 32 },
            fontWeight: 700,
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1.4,
          }}
        >
          Are you sure you want to
          <br />
          Reject <span style={{ fontWeight: 800 }}>{applicantName}</span> ?
        </Typography>

        {/* Buttons */}
        <Box sx={{ display: "flex", gap: "68px", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
          {/* NO = cancel */}
          <Button
            onClick={onCancel}
            sx={{
              bgcolor: GREEN,
              color: NAVY,
              fontSize: 18,
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              borderRadius: "20px",
              px: 5,
              py: 1.5,
              minWidth: 160,
              textTransform: "none",
              "&:hover": { bgcolor: "#6ef094" },
              boxShadow: "none",
            }}
            variant="contained"
          >
            NO
          </Button>

          {/* YES = confirm reject */}
          <Button
            onClick={onConfirm}
            sx={{
              bgcolor: "#ff383c",
              color: "white",
              fontSize: 18,
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              borderRadius: "20px",
              px: 5,
              py: 1.5,
              minWidth: 160,
              textTransform: "none",
              "&:hover": { bgcolor: "#e02020" },
              boxShadow: "none",
            }}
            variant="contained"
          >
            Yes
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
