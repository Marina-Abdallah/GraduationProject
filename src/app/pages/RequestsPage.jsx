import React, { useState } from 'react';
import { Box } from '@mui/material';
import { AdminNavbar } from '../components/AdminEdition/navbar/AdminNavbar';
import { RequestsGrid } from '../components/AdminEdition/requests/RequestsGrid';
import { DeclineModal } from '../components/AdminEdition/requests/DeclineModal';
import backgroundImg from "../../assets/Background.png";

const INITIAL_REQUESTS = [
  {
    id: 1,
    name: 'Microsoft Corporation',
    industry: 'Software Industry',
    email: 'recruitment-team@microsoft.com',
    address: 'Kerdasa, Giza Governorate',
    phone: '02 35390303',
    website: 'www.microsoft.com',
    logoType: 'microsoft',
  },
  {
    id: 2,
    name: 'Ejada',
    industry: 'Software Industry',
    email: 'ejada-hr@outlook.com',
    address: '620 El Hurrya Road - Zezinia, Alexandria',
    phone: '03 5842531',
    website: 'www.ejada.com',
    logoType: 'avatar',
    initials: 'EJ',
    avatarBg: '#3b82f6',
  },
  {
    id: 3,
    name: 'Microsoft Corporation',
    industry: 'Software Industry',
    email: 'recruitment-team@microsoft.com',
    address: 'Kerdasa, Giza Governorate',
    phone: '02 35390303',
    website: 'www.microsoft.com',
    logoType: 'microsoft',
  },
  {
    id: 4,
    name: 'Microsoft Corporation',
    industry: 'Software Industry',
    email: 'recruitment-team@microsoft.com',
    address: 'Kerdasa, Giza Governorate',
    phone: '02 35390303',
    website: 'www.microsoft.com',
    logoType: 'microsoft',
  },
];

export default function RequestsPage() {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [declineTarget, setDeclineTarget] = useState(null);

  const handleApprove = (id) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const handleDeclineClick = (id) => {
    const request = requests.find((r) => r.id === id);
    setDeclineTarget(request);
  };

  const handleDeclineConfirm = () => {
    if (declineTarget) {
      setRequests((prev) => prev.filter((r) => r.id !== declineTarget.id));
      setDeclineTarget(null);
    }
  };

  const handleDeclineCancel = () => {
    setDeclineTarget(null);
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

      {/* Content Area */}
      <div
        style={{
          padding: '40px 8.33%',
        }}
      >
        <RequestsGrid
          requests={requests}
          onApprove={handleApprove}
          onDecline={handleDeclineClick}
        />
      </div>

      {/* Decline Confirmation Modal */}
      <DeclineModal
        open={!!declineTarget}
        companyName={declineTarget?.name || ''}
        onConfirm={handleDeclineConfirm}
        onCancel={handleDeclineCancel}
      />
    </Box >
  );
}
