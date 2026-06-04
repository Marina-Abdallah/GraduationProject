import React from 'react';
import Dialog from '@mui/material/Dialog';

export function LogoutModal({ open, onConfirm, onCancel }) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          background: '#90baef',
          borderRadius: '24px',
          padding: '48px 40px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          maxWidth: 700,
          margin: 'auto',
        },
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 40,
        }}
      >
        <div
          style={{
            color: '#13206d',
            fontSize: 42,
            fontWeight: 500,
            fontFamily: 'Inter, sans-serif',
            textAlign: 'center',
            lineHeight: 1.3,
          }}
        >
          <div>Are you sure you</div>
          <div>want to log out?</div>
        </div>

        <div style={{ display: 'flex', gap: 68, alignItems: 'center' }}>
          <button
            onClick={onCancel}
            style={{
              background: '#84fba2',
              color: '#13206d',
              border: 'none',
              borderRadius: 20,
              width: 200,
              height: 56,
              fontSize: 18,
              fontWeight: 600,
              fontFamily: 'Inter, sans-serif',
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#6de88f'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#84fba2'; }}
          >
            NO
          </button>
          <button
            onClick={onConfirm}
            style={{
              background: '#ff383c',
              color: 'white',
              border: 'none',
              borderRadius: 20,
              width: 200,
              height: 56,
              fontSize: 18,
              fontWeight: 600,
              fontFamily: 'Inter, sans-serif',
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#e02a2e'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#ff383c'; }}
          >
            Yes
          </button>
        </div>
      </div>
    </Dialog>
  );
}
