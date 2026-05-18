import React from "react";
import { Dialog, DialogContent, Box, Typography, Button } from "@mui/material";

export function JobActionDialog({
    open,
    onClose,
    onConfirm,
    isActive,
}) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    borderRadius: "24px",
                    overflow: "hidden",
                    maxWidth: 600,
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
                    {/* Title */}
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
                        {isActive
                            ? "Are you sure you want to close this job?"
                            : "Are you sure you want to activate this job?"}
                    </Typography>

                    {/* Buttons */}
                    <Box sx={{ display: "flex", gap: "48px", alignItems: "center" }}>
                        {/* NO */}
                        <Button
                            onClick={onClose}
                            sx={{
                                bgcolor: isActive ? "#84fba2" : "#ff383c",
                                color: isActive ? "#13206d" : "white",
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 600,
                                fontSize: "18px",
                                borderRadius: "20px",
                                width: "160px",
                                height: "52px",
                                textTransform: "none",
                                "&:hover": {
                                    bgcolor: isActive ? "#6ef094" : "#e02020",
                                },
                            }}
                        >
                            NO
                        </Button>

                        {/* YES */}
                        <Button
                            onClick={onConfirm}
                            sx={{
                                bgcolor: isActive ? "#ff383c" : "#84fba2",
                                color: isActive ? "white" : "#13206d",
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 600,
                                fontSize: "18px",
                                borderRadius: "20px",
                                width: "160px",
                                height: "52px",
                                textTransform: "none",
                                "&:hover": {
                                    bgcolor: isActive ? "#e02020" : "#6ef094",
                                },
                            }}
                        >
                            {isActive ? "Close Job" : "Activate"}
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
}