import React from 'react';

function CheckmarkIcon() {
  return (
    <svg
      width="200"
      height="180"
      viewBox="0 0 200 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25 95 L75 148 L178 42"
        stroke="#13206D"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EmptyState() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingLeft: 80,
        paddingTop: 40,
        paddingRight: 40,
      }}
    >
      <h1
        style={{
          color: '#13206d',
          fontSize: 64,
          fontWeight: 800,
          fontFamily: 'Inter, sans-serif',
          margin: 0,
          lineHeight: 1.2,
        }}
      >
        Things are all caught up, boss.
      </h1>
      <p
        style={{
          color: '#13206d',
          fontSize: 24,
          fontWeight: 600,
          fontFamily: 'Inter, sans-serif',
          margin: '12px 0 0 4px',
        }}
      >
        Nothing to show here.
      </p>
      <div style={{ marginTop: 20, marginLeft: 20 }}>
        <CheckmarkIcon />
      </div>
    </div>
  );
}
