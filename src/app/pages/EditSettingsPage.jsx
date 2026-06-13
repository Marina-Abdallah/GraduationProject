import React, { useState } from 'react';
import { Box,Button } from '@mui/material';
import { AdminNavbar } from '../components/AdminNavbar';
import { AddSkillCard } from '../components/AdminEdition/settings/AddSkillCard';
import { AllSkillsCard } from '../components/AdminEdition/settings/AllSkillsCard';
import { LogoutDialog } from "../components/LogoutDialog";
import { Footer } from '../components/Footer';
import backgroundImg from "../../assets/Background.png";

const INITIAL_SKILLS = [
  'APIs', 'UI/UX', 'SQL', 'Entity Framework Core', 'HTML', 'ADO.NET',
  'MVC', 'C++', 'C#', 'C', 'CSS', 'Node.js',
  'Laravel Framework', 'Figma', 'Adobe Softwares', 'React',
];

export default function EditSettingsPage() {
  const [skills, setSkills] = useState(INITIAL_SKILLS);
  //nst [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);


  const handleAddSkill = (skill) => {
    if (!skills.includes(skill)) {
      setSkills((prev) => [...prev, skill]);
    }
  };

  const handleRemoveSkill = (skill) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    // Placeholder: navigate or clear session
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
        <AdminNavbar />
      </Box>



      {/* Page Title */}
      <div
        style={{
          padding: '40px 8.33% 0',
        }}
      >
        <div
          style={{
            color: '#13206d',
            fontSize: 48,
            fontWeight: 600,
            fontFamily: 'Inter, sans-serif',
            lineHeight: 1,
            marginBottom: 8,
          }}
        >
          Skills Management
        </div>
        <div
          style={{
            color: '#13206d',
            fontSize: 24,
            fontWeight: 500,
            fontFamily: 'Inter, sans-serif',
            lineHeight: 1.5,
          }}
        >
          Add new skills to the system or remove existing ones used across job listings and profiles.
        </div>
      </div>

      {/* Content Area */}
      <div
        style={{
          padding: '40px 8.33%',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        <AddSkillCard onAdd={handleAddSkill} />
        <AllSkillsCard skills={skills} onRemove={handleRemoveSkill} />

        {/* Log out button — right aligned */}
        <div style={{ display: 'flex', justifyContent:'flex-start' }}>
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
        </div>
      </div>

      {/* Footer */}
      <Footer />


      {/* Logout Modal */}
      <LogoutDialog open={logoutOpen} onClose={() => setLogoutOpen(false)} type="user" />
    </Box>
  );
}
