import React, { useState } from "react";
import { Box } from "@mui/material";
import SplashNavbar from "../../../components/SplashNavbar";
import {Footer} from "../../../components/Footer";
import Features from "../../../components/LandingPages/SplashFeatures/Features";
import CommunitySection from "../../../components/LandingPages/CommunitySection/CommunitySection";
import backgroundImg from "../../../../assets/Background.png";
import "./SplashScreen.css";

import man from "../../../../assets/man.png";
import communityImg from "../../../../assets/communitySection.png";
import { useNavigate } from "react-router-dom";
function SplashScreen() {


  const navigate = useNavigate();
  const [, setAnchorEl] = React.useState(null);
  const handleClose = () => setAnchorEl(null);
  const goToPage = (path) => {
    navigate(path);
    handleClose();
  };
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

      {/* HERO SECTION */}
      <section className="hero-section">

        <div className="hero-left">
          <h1>
            Elevate <br />
            Your Career <br />
            With
            <span className="progrow">
              <span className="pro">Pro</span>Grow
            </span>
          </h1>
          <p>
            Advance Your Skills And <br />
            Connect With Top Companies
          </p>

          <button className="hero-btn" onClick={() => goToPage("/LandingPage")}>
            Get Started
          </button>
        </div>

        <div className="hero-right">
          <img src={man} alt="Man stepping up" />
        </div>

      </section>

      <Features />

      <CommunitySection
        title={
          <>
            Why you Should Join <br />
            ProGrow Community?
          </>
        }
        description="The website isn’t just for finding jobs it helps you become ready for them. It’s your career coach, community, and recruiter all in one place."
        image={communityImg}
        imageWidth="420px"
        titleColor="#13206D"
        descColor="#13206D"
        titleSize="40px"
        descSize="24px"
        descWeight="500"
        titleWeight="600"
        imageOffset="-100px"
      />

      <Footer />

    </Box>
  );
}

export default SplashScreen;