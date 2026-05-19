import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { MainNavbar } from "../components/MainNavbar";
import { Footer } from "../components/Footer";
import { ProfileImageCard } from "../components/ProfileImageCard";
import { PersonalInfoCard } from "../components/PersonalInfoCard";
import { ProfileDescriptionCard } from "../components/ProfileDescriptionCard";
import { SkillsCard } from "../components/SkillsCard";
import { SavedPostsModal } from "../components/SavedPostsModal";
import { LogoutDialog } from "../components/LogoutDialog";
import backgroundImg from "../../assets/Background.png";
import api from "../../api/axios";
import { useAppContext } from "../components/AppContext";

export function ProfilePage() {
  const [savedPostsOpen, setSavedPostsOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const { updateProfile, setSkillsList } = useAppContext();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        // Replace "/Users/Profile" with your actual backend endpoint if different
        const response = await api.get("/Users/me/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = response.data;
        
        // Map the backend response to the context state based on ProfileResponseDto
        updateProfile({
          name: data.firstName && data.lastName ? `${data.firstName} ${data.lastName}` : (data.firstName || ""),
          phone: data.phone,
          birthdate: data.birthdate,
          bio: data.bio,
          headline: data.headline,
          major: data.major,
          photo: data.pictureUrl,
          resumeFileName: data.cvUrl,
        });

      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    const fetchSkillsData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await api.get("/Users/skills", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // Assuming response.data is an array of skill objects [{id, name}, ...]
        if (Array.isArray(response.data)) {
           // We will handle objects in AppContext, or if they are strings, handle them
           const formattedSkills = response.data.map(skill => {
             if (typeof skill === 'string') return { id: skill, name: skill };
             return { id: skill.id || skill.skillId || skill.name, name: skill.name || skill.skillName || "Unknown Skill" };
           });
           setSkillsList(formattedSkills);
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchProfileData();
    fetchSkillsData();
  }, [updateProfile, setSkillsList]);

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
        <MainNavbar />
      </Box>


      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          width: "100%",
          maxWidth: 1300,
          mx: "auto",
          px: { xs: 2, md: 4 },
          pt: 3,
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
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <ProfileImageCard />
            <SkillsCard />
          </Box>

          {/* ── Right Column ── */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <PersonalInfoCard />
            <ProfileDescriptionCard />

            {/* Action Buttons */}
            <Box sx={{ display: "flex", gap: 2, flexWrap: { xs: "wrap", sm: "nowrap" } }}>
              <Button
                onClick={() => setSavedPostsOpen(true)}
                sx={{
                  flex: 1,
                  py: 1.5,
                  borderRadius: "20px",
                  bgcolor: "#84fba2",
                  color: "#13206d",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: "16px",
                  textTransform: "none",
                  boxShadow: "0px 4px 12px rgba(132,251,162,0.4)",
                  "&:hover": { bgcolor: "#6ef094", boxShadow: "0px 6px 16px rgba(132,251,162,0.6)" },
                }}
              >
                Saved Posts
              </Button>
              <Button
                onClick={() => setLogoutOpen(true)}
                sx={{
                  flex: 1,
                  py: 1.5,
                  borderRadius: "20px",
                  bgcolor: "#ff383c",
                  color: "white",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: "16px",
                  textTransform: "none",
                  boxShadow: "0px 4px 12px rgba(255,56,60,0.3)",
                  "&:hover": { bgcolor: "#e02020", boxShadow: "0px 6px 16px rgba(255,56,60,0.45)" },
                }}
              >
                Log out
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Footer />
      </Box>

      {/* Modals */}
      <SavedPostsModal
        open={savedPostsOpen}
        onClose={() => setSavedPostsOpen(false)}
        profileType="user"
      />
      <LogoutDialog open={logoutOpen} onClose={() => setLogoutOpen(false)} />
    </Box>
  );
}
