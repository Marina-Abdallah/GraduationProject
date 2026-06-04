import React, { useState } from 'react';
import { WaveBackground } from '../components/AdminEdition/background/WaveBackground';
import { AdminNavbar } from '../components/AdminEdition/navbar/AdminNavbar';
import { AddSkillCard } from '../components/AdminEdition/settings/AddSkillCard';
import { AllSkillsCard } from '../components/AdminEdition/settings/AllSkillsCard';
import { LogoutModal } from '../components/AdminEdition/settings/LogoutModal';
import { ProGrowFooter } from '../components/AdminEdition/footer/ProGrowFooter';

const INITIAL_SKILLS = [
  'APIs', 'UI/UX', 'SQL', 'Entity Framework Core', 'HTML', 'ADO.NET',
  'MVC', 'C++', 'C#', 'C', 'CSS', 'Node.js',
  'Laravel Framework', 'Figma', 'Adobe Softwares', 'React',
];

export default function EditSettingsPage({ onNavigate }) {
  const [skills, setSkills] = useState(INITIAL_SKILLS);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

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
    <div
      style={{
        minHeight: '100vh',
        position: 'relative',
        fontFamily: 'Inter, sans-serif',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <WaveBackground />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        {/* Navbar */}
        <AdminNavbar activePage="settings" onNavigate={onNavigate} />

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
        <div style={{ marginTop: 'auto', padding: '0 8.33% 0' }}>
          <ProGrowFooter />
        </div>
      </div>

      {/* Logout Modal */}
      <LogoutModal
        open={showLogoutModal}
        onConfirm={handleLogoutConfirm}
        onCancel={() => setShowLogoutModal(false)}
      />
    </div>
  );
}
