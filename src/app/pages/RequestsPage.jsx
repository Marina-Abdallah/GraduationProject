import React, { useState } from 'react';
import { WaveBackground } from '../components/AdminEdition/background/WaveBackground';
import { AdminNavbar } from '../components/AdminEdition/navbar/AdminNavbar';
import { RequestsGrid } from '../components/AdminEdition/requests/RequestsGrid';
import { DeclineModal } from '../components/AdminEdition/requests/DeclineModal';

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

export default function RequestsPage({ onNavigate }) {
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
    <div
      style={{
        minHeight: '100vh',
        position: 'relative',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <WaveBackground />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Navbar */}
        <AdminNavbar activePage="requests" onNavigate={onNavigate} />

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
      </div>

      {/* Decline Confirmation Modal */}
      <DeclineModal
        open={!!declineTarget}
        companyName={declineTarget?.name || ''}
        onConfirm={handleDeclineConfirm}
        onCancel={handleDeclineCancel}
      />
    </div>
  );
}
