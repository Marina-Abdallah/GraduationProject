import React from 'react';

export function SkillChip({ label, onRemove, selected, onToggle }) {
  return (
    <div
      onClick={() => onToggle && onToggle(label)}
      style={{
        background: selected ? '#13206d' : 'rgba(132,251,162,0.5)',
        borderRadius: 25,
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        flexShrink: 0,
        cursor: 'pointer',
        boxShadow: selected ? '0 0 0 2px #13206d, 0 4px 12px rgba(19,32,109,0.25)' : 'none',
        transition: 'background 0.18s, box-shadow 0.18s, transform 0.12s',
        transform: selected ? 'scale(1.04)' : 'scale(1)',
        userSelect: 'none',
      }}
    >
      {selected && (
        <svg
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ flexShrink: 0 }}
        >
          <path
            d="M2 6.5L5 9.5L11 3.5"
            stroke="#84fba2"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      <span
        style={{
          color: selected ? '#84fba2' : '#13206d',
          fontSize: 14,
          fontFamily: 'Inter, sans-serif',
          fontWeight: selected ? 600 : 400,
          whiteSpace: 'nowrap',
          transition: 'color 0.18s',
        }}
      >
        {label}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(label);
        }}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 15,
          height: 15,
          flexShrink: 0,
          opacity: selected ? 0.7 : 1,
        }}
        aria-label={`Remove ${label}`}
      >
        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.125 0.625L0.625 8.125"
            stroke={selected ? '#84fba2' : '#13206D'}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.25"
          />
          <path
            d="M0.625 0.625L8.125 8.125"
            stroke={selected ? '#84fba2' : '#13206D'}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.25"
          />
        </svg>
      </button>
    </div>
  );
}
