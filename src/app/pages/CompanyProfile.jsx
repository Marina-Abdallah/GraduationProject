import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { CompanyNavbar } from "../components/CompanyNavbar";
import { Footer } from "../components/Footer";
//import { CompanySidebar } from "../components/CompanySidebar";
import { CompanyDescriptionCard } from "../components/CompanyDescriptionCard";
import { SavedItemsModal } from "../components/SavedItemsModal";
import { LogoutDialog } from "../components/LogoutDialog";
import backgroundImg from "../../assets/Background.png";
import { CompanyImageCard } from "../components/CompanyImageCard";

export function CompanyProfile() {
    const [savedItemsOpen, setSavedItemsOpen] = useState(false);
    const [logoutOpen, setLogoutOpen] = useState(false);

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: `url(${backgroundImg})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top center",
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
            }}
        >
            {/* Navbar */}
            <Box
                sx={{
                    width: "100%",
                    pt: 3,
                    px: { xs: 2, md: 4 },
                    position: "relative",
                    zIndex: 20,
                }}
            >
                <CompanyNavbar />
            </Box>


            {/* Main Content */}
            <Box
                sx={{
                    flex: 1,
                    width: "100%",
                    maxWidth: 1300,
                    mx: "auto",
                    px: { xs: 2, md: 4 },
                    pt: 3, //
                    pb: 6,
                }}
            >
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1fr 2fr" },
                        gap: 3,
                        alignItems: "start",
                    }}
                >
                    {/* ── Left Column ── */}
                    <Box sx={{
                        display: "flex", flexDirection: "column", gap: 2,
                    }}>
                        <CompanyImageCard />
                        {/* Action Buttons */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 2,
                                width: "100%",
                            }}
                        >
                            <Button
                                onClick={() => setSavedItemsOpen(true)}
                                sx={{
                                    textAlign: "center",
                                    width: "250px",
                                    py: 1.5,
                                    borderRadius: "20px",
                                    bgcolor: "#84fba2",
                                    color: "#13206d",
                                    fontFamily: "'Inter', sans-serif",
                                    fontWeight: 600,
                                    fontSize: "16px",
                                    textTransform: "none",
                                    "&:hover": { bgcolor: "#6ef094", boxShadow: "0px 6px 16px rgba(132,251,162,0.6)" },
                                }}
                            >
                                Saved Posts
                            </Button>
                            <Button
                                onClick={() => setLogoutOpen(true)}
                                sx={{
                                    width: "250px",
                                    py: 1.5,
                                    borderRadius: "20px",
                                    bgcolor: "#ff383c",
                                    color: "white",
                                    fontFamily: "'Inter', sans-serif",
                                    fontWeight: 600,
                                    fontSize: "16px",
                                    textTransform: "none",
                                    "&:hover": { bgcolor: "#e02020", boxShadow: "0px 6px 16px rgba(255,56,60,0.45)" },
                                }}
                            >
                                Log out
                            </Button>
                        </Box>
                    </Box>

                    {/* ── Right Column ── */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        <CompanyDescriptionCard />
                    </Box>
                </Box>
            </Box>

            {/* Footer */}
            <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <Footer />
            </Box>

            {/* Modals */}
            <SavedItemsModal
                open={savedItemsOpen}
                onClose={() => setSavedItemsOpen(false)}
                profileType="company"
            />

            <LogoutDialog open={logoutOpen} onClose={() => setLogoutOpen(false) } type="company" />
        </Box>
    );
}
