import React from 'react';

const companies = [
  { name: 'Microsoft Corporation', industry: 'Software', jobs: 42, hired: 28, status: 'Active' },
  { name: 'Google LLC', industry: 'Technology', jobs: 38, hired: 21, status: 'Active' },
  { name: 'Amazon Web Services', industry: 'Cloud / E-Commerce', jobs: 31, hired: 19, status: 'Active' },
  { name: 'Meta Platforms', industry: 'Social Media', jobs: 26, hired: 14, status: 'Active' },
  { name: 'Ejada Systems', industry: 'Software', jobs: 18, hired: 12, status: 'Active' },
];

function InitialsAvatar({ name, bg }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('');
  return (
    <div
      style={{
        width: 38,
        height: 38,
        borderRadius: '50%',
        background: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 14,
        fontWeight: 700,
        fontFamily: 'Inter, sans-serif',
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

const avatarColors = ['#13206d', '#3b82f6', '#f97316', '#8b5cf6', '#84fba2'];

export function TopCompanies() {
  return (
    <div
      style={{
        background: 'white',
        borderRadius: 16,
        padding: '24px 28px',
        filter: 'drop-shadow(0px 4px 12px rgba(132,251,162,0.3))',
      }}
    >
      <div
        style={{
          color: '#13206d',
          fontSize: 18,
          fontWeight: 600,
          fontFamily: 'Inter, sans-serif',
          marginBottom: 20,
        }}
      >
        Top Companies
      </div>

      {/* Header */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1.2fr 80px 80px 90px',
          gap: 16,
          paddingBottom: 10,
          borderBottom: '1px solid rgba(19,32,109,0.1)',
          marginBottom: 6,
        }}
      >
        {['Company', 'Industry', 'Jobs', 'Hired', 'Status'].map((h) => (
          <span
            key={h}
            style={{
              color: 'rgba(19,32,109,0.45)',
              fontSize: 12,
              fontWeight: 600,
              fontFamily: 'Inter, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            {h}
          </span>
        ))}
      </div>

      {/* Rows */}
      {companies.map((c, i) => (
        <div
          key={c.name}
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1.2fr 80px 80px 90px',
            gap: 16,
            alignItems: 'center',
            padding: '12px 0',
            borderBottom: i < companies.length - 1 ? '1px solid rgba(19,32,109,0.05)' : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <InitialsAvatar
              name={c.name}
              bg={avatarColors[i % avatarColors.length] === '#84fba2' ? '#0d9488' : avatarColors[i % avatarColors.length]}
            />
            <span
              style={{
                color: '#13206d',
                fontSize: 14,
                fontWeight: 500,
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {c.name}
            </span>
          </div>
          <span
            style={{
              color: 'rgba(19,32,109,0.6)',
              fontSize: 14,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {c.industry}
          </span>
          <span
            style={{
              color: '#13206d',
              fontSize: 14,
              fontWeight: 600,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {c.jobs}
          </span>
          <span
            style={{
              color: '#13206d',
              fontSize: 14,
              fontWeight: 600,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {c.hired}
          </span>
          <span
            style={{
              background: 'rgba(132,251,162,0.3)',
              color: '#0a6633',
              borderRadius: 20,
              padding: '4px 12px',
              fontSize: 12,
              fontWeight: 600,
              fontFamily: 'Inter, sans-serif',
              display: 'inline-block',
            }}
          >
            {c.status}
          </span>
        </div>
      ))}
    </div>
  );
}
