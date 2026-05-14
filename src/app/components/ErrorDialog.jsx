import React from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
} from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";

const NAVY = "#13206d";
const GREEN = "#84fba2";
const RED = "#C32929";

export function ErrorDialog({ open, onClose, message }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "20px",
          boxShadow: "0 24px 64px rgba(19,32,109,0.2)",
          overflow: "hidden",
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            px: 4,
            py: 4,
            textAlign: "center",
          }}
        >
          {/* Icon */}
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              bgcolor: "rgba(195,41,41,0.08)",
              border: `2px solid rgba(195,41,41,0.2)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BlockIcon sx={{ fontSize: 36, color: RED }} />
          </Box>

          {/* Title */}
          <Typography
            sx={{
              color: NAVY,
              fontWeight: 800,
              fontSize: 20,
              fontFamily: "'Inter', sans-serif",
              lineHeight: 1.3,
            }}
          >
            Action Not Allowed
          </Typography>

          {/* Message */}
          <Typography
            sx={{
              color: NAVY,
              fontSize: 15,
              opacity: 0.75,
              fontFamily: "'Inter', sans-serif",
              lineHeight: 1.65,
            }}
          >
            {message || "You cannot apply for jobs as a company account."}
          </Typography>

          {/* Close button */}
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              mt: 0.5,
              bgcolor: RED,
              color: "white",
              fontWeight: 700,
              fontSize: 15,
              fontFamily: "'Inter', sans-serif",
              textTransform: "none",
              borderRadius: "12px",
              px: 4,
              py: 1.2,
              boxShadow: "0 4px 16px rgba(195,41,41,0.3)",
              "&:hover": { bgcolor: "#a82020" },
            }}
          >
            Got it
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
