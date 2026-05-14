import React from "react";
import { Box } from "@mui/material";
import { MainNavbar } from "../components/MainNavbar";
import { Footer } from "../components/Footer";
import { FeaturesGrid } from "../components/FeaturesGrid";
import backgroundImg from "../../assets/Background.png";

const LIGHT_BLUE = "#90baef";
const GREEN = "#84fba2";

export function FeaturesPage() {
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
      {/* ── Navbar ──────────────────────────────────────────────── */}
      <Box
        sx={{
          width: "100%",
          pt: 4,
          px: { xs: 2, md: 4 },
          position: "relative",
          zIndex: 20,
        }}
      >
        <MainNavbar />
      </Box>

      {/* ── Feature Cards ───────────────────────────────────────── */}
      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          pt: { xs: 4, md: 6 },
          pb: { xs: 8, md: 12 },
          position: "relative",
          zIndex: 10,
        }}
      >
        <FeaturesGrid />
      </Box>

      {/* ── Footer ──────────────────────────────────────────────── */}
     <Box
       sx={{
       width: "100%",
       display: "flex",
       justifyContent: "center",
       }}
     >
        <Footer />
      </Box>
    </Box>
  );
}