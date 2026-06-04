import React from 'react';
import { Box } from '@mui/material';
import { AdminNavbar } from '../components/AdminEdition/navbar/AdminNavbar';
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

function DashboardBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        background: 'white',
        pointerEvents: 'none',
      }}
    >
      {/*
        The Figma Admin Dashboard wave uses the same organic path as the other
        pages but with a horizontal mirror (scaleX(-1)), making the filled shape
        occupy the upper-LEFT instead of the upper-right.
        preserveAspectRatio="xMidYMin slice" anchors the viewBox to the top so
        the S-curve boundary is visible in the viewport, matching the reference.
      */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transform: 'scaleX(-1)',
        }}
        viewBox="0 0 1457 2340"
        preserveAspectRatio="xMidYMin slice"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <defs>
          <filter
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
            height="2340"
            id="dashWaveFilter"
            width="1457"
            x="0"
            y="0"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dy="-8" />
            <feGaussianBlur stdDeviation="4" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.517647 0 0 0 0 0.984314 0 0 0 0 0.635294 0 0 0 0.5 0" />
            <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow" />
            <feBlend in="SourceGraphic" in2="effect1_dropShadow" mode="normal" result="shape" />
          </filter>
          <linearGradient gradientUnits="userSpaceOnUse" id="dashWaveGradient" x1="728.5" x2="728.5" y1="16" y2="2340">
            <stop offset="0.399038" stopColor="#90BAEF" />
            <stop offset="1" stopColor="white" />
          </linearGradient>
        </defs>
        <g filter="url(#dashWaveFilter)">
          <path
            d="M256.864 729.052C91.8911 687.023 22.216 799.601 8 861.144V2340H1449V16C1126.05 33.0037 1224.89 385.534 887.22 479.6C750.552 517.671 773.155 763.076 644.208 836.627C468.355 936.932 463.079 781.589 256.864 729.052Z"
            fill="url(#dashWaveGradient)"
          />
        </g>
      </svg>
    </div>
  );
}

export default function AdminDashboardPage({ onNavigate }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: `url(${backgroundImg})`,
        backgroundSize: "cover",
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

      <div
        style={{
          minHeight: '100vh',
          position: 'relative',
          fontFamily: 'Inter, sans-serif',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <DashboardBackground />

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
          <AdminNavbar activePage="dashboard" onNavigate={onNavigate} />

          {/* Main white card */}
          <div style={{ padding: '32px 8.33%', flex: 1 }}>
            <div
              style={{
                background: 'rgba(255,255,255,0.85)',
                borderRadius: 16,
                padding: '32px',
                backdropFilter: 'blur(8px)',
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

          {/* Footer */}
          {/* <div style={{ padding: '0 8.33% 0' }}> */}
            <Footer />
          {/* </div> */}
        </div>
      </div>
    </Box>
  );
}
