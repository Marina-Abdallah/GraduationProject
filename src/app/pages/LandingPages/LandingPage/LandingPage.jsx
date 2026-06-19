import React from "react";
import { Box } from "@mui/material";
import { Footer } from "../../../components/Footer";
import "./LandingPage.css";
import graphImg from "../../../../assets/graph.png";
import backgroundImg from "../../../../assets/homebackground.png";

// Components
import SplashNavbar from "../../../components/SplashNavbar";
import HeroSection from "../../../components/LandingPages/HeroSection/heroSection";
import CommunitySection from "../../../components/LandingPages/CommunitySection/CommunitySection";
function LandingPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: `url(${backgroundImg})`,
        backgroundSize: "100% auto",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top center",

      }}
    >
      <Box
        sx={{
          width: "100%",
          pt: 3,
          px: { xs: 2, md: 4 },
          position: "relative",
          zIndex: 20,
        }}
      >
        <SplashNavbar />
      </Box>

      {/* Hero Section */}
      <HeroSection />
      <CommunitySection
        title={<>
          Shape your career with intelligence and purpose     </>}
        description="Experience a smart platform that understands your goals guiding you through customized learning paths, refining your professional profile, and linking you with world-class opportunities to elevate your future."
        image={graphImg}
        imageWidth="420px"
        titleColor="#13206D"
        descColor="#13206D"
        titleSize="32px"
        descSize="24px"
        descWeight="500"
        titleWeight="800"
        imageOffset="-100px"

      />

      {/* <WaveSection /> */}
      {/* <InfoSection /> */}
      <Footer />

    </Box>
  );
}

export default LandingPage;