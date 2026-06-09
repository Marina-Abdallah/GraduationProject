import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { AdminNavbar } from '../components/AdminEdition/navbar/AdminNavbar';
import { RequestsGrid } from '../components/AdminEdition/requests/RequestsGrid';
import { DeclineModal } from '../components/AdminEdition/requests/DeclineModal';
import api from '../../api/axios';
import backgroundImg from "../../assets/Background.png";

const AVATAR_COLORS = ['#3b82f6', '#6366f1', '#f97316', '#10b981', '#8b5cf6', '#ec4899'];

const getInitials = (name) => {
  if (!name) return 'CO';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'CO';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const getAvatarBg = (id) => AVATAR_COLORS[id % AVATAR_COLORS.length];

const normalizeImageUrl = (url) => {
  if (!url || url === 'URL') return null;

  let cleanUrl = url.replace(/^["']|["']$/g, '');

  if (cleanUrl.includes('wwwroot')) {
    const match = cleanUrl.match(/wwwroot(.*)$/);
    if (match) {
      const relativePath = match[1].replace(/\\/g, '/');
      return `https://localhost:7292${relativePath}`;
    }
  }

  if (cleanUrl.includes('uploads')) {
    const match = cleanUrl.match(/(uploads.*)$/);
    if (match) {
      const relativePath = match[1].replace(/\\/g, '/');
      return `https://localhost:7292/${relativePath}`;
    }
  }

  if (cleanUrl.startsWith('/')) {
    return `https://localhost:7292${cleanUrl}`;
  }

  if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) {
    return cleanUrl;
  }

  if (cleanUrl.match(/^[a-zA-Z]:\\/)) {
    return `file:///${cleanUrl.replace(/\\/g, '/')}`;
  }

  return cleanUrl;
};

const normalizeCompany = (company) => {
  const imageUrl = normalizeImageUrl(company.pictureUrl);

  return {
    id: company.id,
    name: company.name || company.email || 'Company',
    industry: 'Pending Activation',
    email: company.email || '',
    address: company.address || 'Address not available',
    phone: company.phone || 'N/A',
    website: company.websiteUrl || '',
    logoType: imageUrl ? 'image' : 'avatar',
    imageUrl: imageUrl || undefined,
    initials: getInitials(company.name || company.email),
    avatarBg: getAvatarBg(company.id),
  };
};

export default function RequestsPage() {
  const [requests, setRequests] = useState([]);
  const [declineTarget, setDeclineTarget] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Admin authentication token not found. Please sign in as an admin.');
      setLoading(false);
      return;
    }

    try {
      const response = await api.get('/Admin/companies', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const companies = Array.isArray(response.data) ? response.data : [];
      setRequests(companies.map(normalizeCompany));
    } catch (fetchError) {
      console.error('Failed to load pending companies:', fetchError);
      const message = fetchError?.response?.data || fetchError?.message || 'Unable to fetch pending companies.';
      setError(typeof message === 'string' ? message : 'Unable to fetch pending companies.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const removeRequest = (id) => {
    setRequests((prev) => prev.filter((request) => request.id !== id));
  };

  const handleApprove = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Admin authentication token not found.');
      return;
    }

    try {
      await api.patch(`/Admin/companies/${id}/approve`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      removeRequest(id);
    } catch (approveError) {
      console.error('Failed to approve company:', approveError);
      const message = approveError?.response?.data || approveError?.message || 'Unable to approve company.';
      setError(typeof message === 'string' ? message : 'Unable to approve company.');
    }
  };

  const handleDeclineClick = (id) => {
    const request = requests.find((r) => r.id === id);
    setDeclineTarget(request);
  };

  const handleDeclineConfirm = async () => {
    if (!declineTarget) return;

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Admin authentication token not found.');
      setDeclineTarget(null);
      return;
    }

    try {
      await api.patch(`/Admin/companies/${declineTarget.id}/decline`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      removeRequest(declineTarget.id);
    } catch (declineError) {
      console.error('Failed to decline company:', declineError);
      const message = declineError?.response?.data || declineError?.message || 'Unable to decline company.';
      setError(typeof message === 'string' ? message : 'Unable to decline company.');
    } finally {
      setDeclineTarget(null);
    }
  };

  const handleDeclineCancel = () => {
    setDeclineTarget(null);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: `url(${backgroundImg})`,
        backgroundSize: '100% auto',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          pt: 3,
          px: { xs: 2, md: 4 },
          position: 'relative',
          zIndex: 20,
        }}
      >
        <AdminNavbar />
      </Box>

      <div
        style={{
          padding: '40px 8.33%',
          width: '100%',
          maxWidth: 1320,
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
        ) : error ? (
          <Box
            sx={{
              width: '100%',
              bgcolor: 'rgba(255, 235, 238, 0.9)',
              borderRadius: 3,
              p: 3,
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" sx={{ color: '#b00020', mb: 1 }}>
              {error}
            </Typography>
            <Typography variant="body2" sx={{ color: '#4a4a4a' }}>
              Please refresh or check your admin credentials.
            </Typography>
          </Box>
        ) : (
          <RequestsGrid
            requests={requests}
            onApprove={handleApprove}
            onDecline={handleDeclineClick}
          />
        )}
      </div>

      <DeclineModal
        open={!!declineTarget}
        companyName={declineTarget?.name || ''}
        onConfirm={handleDeclineConfirm}
        onCancel={handleDeclineCancel}
      />
    </Box>
  );
}
