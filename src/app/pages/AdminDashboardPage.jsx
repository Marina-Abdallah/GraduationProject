import React from 'react';
import { Box } from '@mui/material';
import { AdminNavbar } from '../components/AdminNavbar';
import { Footer } from '../components/Footer';
import { StatsCard } from '../components/AdminEdition/dashboard/StatsCard';
import { AnalyticsChart } from '../components/AdminEdition/dashboard/AnalyticsChart';
import { UsersRoleChart } from '../components/AdminEdition/dashboard/UsersRoleChart';
import { RecentActivity } from '../components/AdminEdition/dashboard/RecentActivity';
import { JobsTrend } from '../components/AdminEdition/dashboard/JobsTrend';
import { TopCompanies } from '../components/AdminEdition/dashboard/TopCompanies';
import backgroundImg from "../../assets/Background.png";

const stats = [
  { title: 'Total Users', value: '12,456', growth: '12% this month', positive: true, icon: '👥' },
  { title: 'Active Companies', value: '248', growth: '8% this week', positive: true, icon: '🏢' },
  { title: 'Jobs Posted', value: '1,892', growth: '24% this week', positive: true, icon: '💼' },
  { title: 'Revenue', value: '$84,230', growth: '15% this month', positive: true, icon: '📈' },
];


export default function AdminDashboardPage() {
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
     <div style={{ padding: '32px 8.33%',flex:1}}>
        <div
          style={{
            background: 'rgba(255,255,255,0.85)',
            borderRadius: 16,
            backdropFilter: 'blur(8px)',
            padding:'32px',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
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

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 20 }}>
            {stats.map((s) => (
              <StatsCard key={s.title} {...s} />
            ))}
          </div>

          {/* Charts row */}
          <div style={{ display: 'flex', gap: 20 }}>
            <AnalyticsChart />
            <UsersRoleChart />
          </div>

          {/* Activity + Jobs row */}
          <div style={{ display: 'flex', gap: 20 }}>
            <RecentActivity />
            <JobsTrend />
          </div>

          {/* Top companies */}
          <TopCompanies />
        </div>
      </div>

      <Footer />
    </Box>
  );
}
