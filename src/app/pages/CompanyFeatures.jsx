import React from "react";
import { Box } from "@mui/material";
import { CompanyNavbar } from "../components/CompanyNavbar";
import { Footer } from "../components/Footer";
import { CompanyFeaturesGrid } from "../components/CompanyFeaturesGrid";
import backgroundImg from "../../assets/Background.png";

export function CompanyFeaturesPage() {
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
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* ── Navbar ─────────────────────────────────────────── */}
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

      {/* ── Feature Cards ──────────────────────────────────── */}
      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          pt: { xs: 3, md: 3 },
          pb: { xs: 6, md: 6 },
          position: "relative",
          zIndex: 10,
        }}
      >
        <CompanyFeaturesGrid />
      </Box>

      {/* ── Footer ─────────────────────────────────────────── */}
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Footer />
      </Box>
    </Box>
  );
}
