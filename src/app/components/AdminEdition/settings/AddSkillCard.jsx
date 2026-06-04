import React, { useState } from 'react';

export function AddSkillCard({ onAdd }) {
  const [value, setValue] = useState('');

  const handleAdd = () => {
    const trimmed = value.trim();
    if (trimmed) {
      onAdd(trimmed);
      setValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <div
      style={{
        background: 'white',
        borderRadius: 16,
        padding: '30px 20px',
        filter: 'drop-shadow(0px 8px 4px rgba(132,251,162,0.5))',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      <div
        style={{
          padding: '10px',
          color: '#13206d',
          fontSize: 28,
          fontWeight: 500,
          fontFamily: 'Inter, sans-serif',
        }}
      >
        Add New Skill
      </div>

      <div style={{ display: 'flex', gap: 38, alignItems: 'center' }}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter skill name (e.g., Python, Project Management)"
          style={{
            flex: 1,
            height: 44,
            background: 'rgba(132,251,162,0.14)',
            border: 'none',
            borderRadius: 8,
            padding: '10px 12px',
            fontSize: 14,
            fontFamily: 'Inter, sans-serif',
            color: '#13206d',
            outline: 'none',
          }}
        />
        <button
          onClick={handleAdd}
          style={{
            background: '#84fba2',
            border: 'none',
            borderRadius: 8,
            width: 172,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'background 0.15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#6de88f'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#84fba2'; }}
        >
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="12.5" y1="4" x2="12.5" y2="21" stroke="#13206D" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="4" y1="12.5" x2="21" y2="12.5" stroke="#13206D" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <span
            style={{
              color: '#13206d',
              fontSize: 16,
              fontWeight: 500,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Add Skill
          </span>
        </button>
      </div>
    </div>
  );
}
