import React from 'react';

export function RecentActivity({ activities = [] }) {
  return (
    <div
      style={{
        background: 'white',
        borderRadius: 16,
        padding: '24px 28px',
        filter: 'drop-shadow(0px 4px 12px rgba(132,251,162,0.3))',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
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
        Recent Activity
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {activities.map((item) => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: item.color === '#13206d' ? 'rgba(19,32,109,0.1)' : `${item.color}33`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                flexShrink: 0,
              }}
            >
              {item.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  color: '#13206d',
                  fontSize: 13,
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  lineHeight: 1.4,
                }}
              >
                {item.text}
              </div>
              <div
                style={{
                  color: 'rgba(19,32,109,0.45)',
                  fontSize: 12,
                  fontFamily: 'Inter, sans-serif',
                  marginTop: 2,
                }}
              >
                {item.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
