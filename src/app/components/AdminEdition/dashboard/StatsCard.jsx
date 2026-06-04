import React from 'react';

export function StatsCard({ title, value, growth, positive, icon }) {
  return (
    <div
      style={{
        background: 'white',
        borderRadius: 16,
        padding: '24px 28px',
        filter: 'drop-shadow(0px 4px 12px rgba(132,251,162,0.3))',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        flex: 1,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div
          style={{
            width: 48,
            height: 48,
            background: 'rgba(132,251,162,0.2)',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
          }}
        >
          {icon}
        </div>
        <span
          style={{
            background: positive ? 'rgba(132,251,162,0.25)' : 'rgba(255,56,60,0.12)',
            color: positive ? '#0a7c3e' : '#cc1c20',
            borderRadius: 20,
            padding: '4px 10px',
            fontSize: 13,
            fontWeight: 600,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {positive ? '↑' : '↓'} {growth}
        </span>
      </div>
      <div
        style={{
          color: '#13206d',
          fontSize: 32,
          fontWeight: 700,
          fontFamily: 'Inter, sans-serif',
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          color: 'rgba(19,32,109,0.55)',
          fontSize: 14,
          fontWeight: 500,
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {title}
      </div>
    </div>
  );
}
