import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { AdminNavbar } from '../components/AdminNavbar';
import { Footer } from '../components/Footer';
import { StatsCard } from '../components/AdminEdition/dashboard/StatsCard';
import { AnalyticsChart } from '../components/AdminEdition/dashboard/AnalyticsChart';
import { UsersRoleChart } from '../components/AdminEdition/dashboard/UsersRoleChart';
import { RecentActivity } from '../components/AdminEdition/dashboard/RecentActivity';
import { JobsTrend } from '../components/AdminEdition/dashboard/JobsTrend';
import { TopCompanies } from '../components/AdminEdition/dashboard/TopCompanies';
import api from '../../api/axios';
import backgroundImg from "../../assets/Background.png";

const formatNumber = (value) => {
  if (value == null) return '0';
  return Number(value).toLocaleString();
};

const formatRelativeTime = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return '';

  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);

  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes} min ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} hr ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;

  return date.toLocaleDateString();
};

const buildStats = (dashboard) => [
  {
    title: 'Total Users',
    value: formatNumber(dashboard?.totalUsers),
    growth: '12% this month',
    positive: true,
    icon: '👥',
  },
  {
    title: 'Active Companies',
    value: formatNumber(dashboard?.approvedCompanies),
    growth: '8% this week',
    positive: true,
    icon: '🏢',
  },
  {
    title: 'Jobs Posted',
    value: formatNumber(dashboard?.totalJobs),
    growth: '24% this week',
    positive: true,
    icon: '💼',
  },
];

const buildAnalyticsData = (dashboard) => {
  const jobsTrend = dashboard?.jobsTrend ?? [];
  const applicationsTrend = dashboard?.applicationsTrend ?? [];

  return jobsTrend.map((item, index) => ({
    day: item.label,
    users: applicationsTrend[index]?.count ?? 0,
    jobs: item.count ?? 0,
  }));
};

const buildUsersRoleData = (dashboard) => [
  { name: 'Students', value: dashboard?.totalUsers ?? 0 },
  { name: 'Companies', value: dashboard?.totalCompanies ?? 0 },
  { name: 'Admins', value: 0 },
];

const buildJobsTrendData = (dashboard) =>
  (dashboard?.applicationsTrend ?? []).map((item) => ({
    day: item.label,
    completed: item.count ?? 0,
  }));

const buildRecentActivity = (dashboard) =>
  (dashboard?.recentJobs ?? []).map((job) => ({
    id: job.jobId,
    type: 'job',
    text: `New job posted: ${job.title}`,
    time: formatRelativeTime(job.createdAt),
    color: '#13206d',
    icon: '💼',
  }));

const buildTopCompanies = (dashboard) =>
  (dashboard?.topCompanies ?? []).map((company) => ({
    name: company.name,
    industry: 'Software',
    jobs: company.jobsCount ?? 0,
    hired: company.applicationsCount ?? 0,
    status: company.status === 'Approved' ? 'Active' : company.status,
  }));

export default function AdminDashboardPage() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState('');

  const fetchDashboard = useCallback(async () => {
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Admin authentication token not found. Please sign in as an admin.');
      return;
    }

    try {
      const response = await api.get('/Admin/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDashboard(response.data);
    } catch (err) {
      console.error('Failed to fetch admin dashboard:', err);
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          'Failed to load dashboard data. Please try again.'
      );
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const stats = buildStats(dashboard);
  const analyticsData = buildAnalyticsData(dashboard);
  const usersRoleData = buildUsersRoleData(dashboard);
  const jobsTrendData = buildJobsTrendData(dashboard);
  const recentActivity = buildRecentActivity(dashboard);
  const topCompanies = buildTopCompanies(dashboard);

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

      {/* Main white card */}
      <Box
        sx={{
          flex: 1,
          width: { xs: '100%', md: '80%' },
          maxWidth: '100%',
          alignSelf: 'center',
          mx: 'auto',
          boxSizing: 'border-box',
          px: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 },
          py: { xs: 3, md: 4 },
        }}
      >
        <Box
          sx={{
            background: 'rgba(255,255,255,0.85)',
            borderRadius: '16px',
            backdropFilter: 'blur(8px)',
            p: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          {/* Page title */}
          <div>
            <div
              style={{
                color: '#13206d',
                fontSize: 32,
                fontWeight: 700,
                fontFamily: 'Inter, sans-serif',
                lineHeight: 1,
                marginBottom: 6,
              }}
            >
              Admin Dashboard
            </div>
            <div style={{ color: 'rgba(19,32,109,0.55)', fontSize: 15, fontFamily: 'Inter, sans-serif' }}>
              Welcome back! Here's what's happening on the platform today.
            </div>
          </div>

          {error && (
            <Typography color="error" sx={{ fontFamily: 'Inter, sans-serif', fontSize: 14 }}>
              {typeof error === 'string' ? error : 'Failed to load dashboard data.'}
            </Typography>
          )}

          {/* Stats row */}
          <Box
            sx={{
              display: 'flex',
              gap: '20px',
              width: '100%',
              flexDirection: { xs: 'column', md: 'row' },
              '& > *': {
                flex: { xs: '1 1 auto', md: '1 1 0' },
                minWidth: { md: 0 },
              },
            }}
          >
            {stats.map((s) => (
              <StatsCard key={s.title} {...s} />
            ))}
          </Box>

          {/* Charts row */}
          <Box
            sx={{
              display: 'flex',
              gap: '20px',
              width: '100%',
              flexDirection: { xs: 'column', lg: 'row' },
              '& > *': {
                minWidth: 0,
              },
            }}
          >
            <AnalyticsChart data={analyticsData} />
            <UsersRoleChart data={usersRoleData} />
          </Box>

          {/* Activity + Jobs row */}
          <Box
            sx={{
              display: 'flex',
              gap: '20px',
              width: '100%',
              flexDirection: { xs: 'column', lg: 'row' },
              '& > *': {
                minWidth: 0,
              },
            }}
          >
            <RecentActivity activities={recentActivity} />
            <JobsTrend data={jobsTrendData} />
          </Box>

          {/* Top companies */}
          <Box sx={{ width: '100%', minWidth: 0 }}>
            <TopCompanies companies={topCompanies} />
          </Box>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
