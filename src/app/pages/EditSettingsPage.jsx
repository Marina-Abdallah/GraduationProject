import React, { useState, useEffect, useCallback } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AdminNavbar } from '../components/AdminEdition/navbar/AdminNavbar';
import React, { useState } from 'react';
import { Box,Button } from '@mui/material';
import { AdminNavbar } from '../components/AdminNavbar';
import { AddSkillCard } from '../components/AdminEdition/settings/AddSkillCard';
import { AllSkillsCard } from '../components/AdminEdition/settings/AllSkillsCard';
import { LogoutDialog } from "../components/LogoutDialog";
import { Footer } from '../components/Footer';
import api from '../../api/axios';
import backgroundImg from "../../assets/Background.png";

export default function EditSettingsPage() {
  const [skills, setSkills] = useState(INITIAL_SKILLS);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleAddSkill = (skill) => {
    if (!skills.includes(skill)) {
      setSkills((prev) => [...prev, skill]);
    }
  };

  const handleRemoveSkill = async (skillNameOrId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Admin authentication token not found.');
      return;
    }

    try {
      // Find the skill ID from the skills array
      let skillId = skillNameOrId;
      
      // If it's a string (skill name), find its ID
      if (typeof skillNameOrId === 'string') {
        const skill = skills.find(s => s.name === skillNameOrId || s.Name === skillNameOrId);
        if (!skill) {
          setError('Skill not found.');
          return;
        }
        skillId = skill.id || skill.Id;
      }

      await api.delete(`/Admin/skills/${skillId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Refetch skills to sync with backend
      await fetchSkills();
      setError('');
    } catch (deleteError) {
      console.error('Failed to remove skill:', deleteError);
      const message = deleteError?.response?.data || deleteError?.message || 'Unable to remove skill.';
      setError(typeof message === 'string' ? message : 'Unable to remove skill.');
    }
  };

  const handleLogoutConfirm = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    try {
      const token = localStorage.getItem('token');
      if (token) {
        await api.post(
          '/Users/logout',
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    } catch (logoutError) {
      console.error('Logout failed:', logoutError);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      setIsLoggingOut(false);
      setShowLogoutModal(false);
      navigate('/');
    }
  };

  // Transform skills for display
  const skillNames = skills.map(s => s.name || s.Name).filter(Boolean);

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

      {/* Error Message */}
      {error && (
        <div
          style={{
            margin: '20px 8.33%',
            width: 'calc(100% - 16.66%)',
            maxWidth: 1200,
            padding: '16px',
            backgroundColor: 'rgba(255, 235, 238, 0.9)',
            borderRadius: '8px',
            color: '#b00020',
            fontSize: '14px',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {error}
        </div>
      )}

      {/* Content Area */}
      <div
        style={{
          padding: '40px 8.33%',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          width: 'calc(100% - 16.66%)',
          maxWidth: 1200,
          boxSizing: 'border-box',
        }}
      >
        {loading ? (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 320,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <AddSkillCard onAdd={handleAddSkill} />
            <AllSkillsCard skills={skillNames} onRemove={handleRemoveSkill} />
          </>
        )}

        {/* Log out button — right aligned */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={() => setShowLogoutModal(true)}
            style={{
              background: '#ff383c',
              color: 'white',
              border: 'none',
              borderRadius: 16,
              width: 180,
              height: 48,
              fontSize: 18,
              fontWeight: 600,
              fontFamily: 'Inter, sans-serif',
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#e02a2e'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#ff383c'; }}
          >
            Log out
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Logout Modal */}
      <LogoutDialog open={logoutOpen} onClose={() => setLogoutOpen(false)} type="user" />
    </Box>
  );
}
