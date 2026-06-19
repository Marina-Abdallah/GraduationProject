import React, { useState } from 'react';
import { SkillChip } from './SkillChip';

export function AllSkillsCard({ skills, onRemove }) {
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleToggle = (label) => {
    setSelectedSkills((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );
  };

  const selectedCount = selectedSkills.length;

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
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div
          style={{
            padding: '10px',
            color: '#13206d',
            fontSize: 28,
            fontWeight: 500,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          All Skills ({skills.length})
        </div>

        {selectedCount > 0 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(19,32,109,0.07)',
              borderRadius: 20,
              padding: '6px 14px',
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#13206d',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                color: '#13206d',
                fontSize: 14,
                fontWeight: 600,
                fontFamily: 'Inter, sans-serif',
                whiteSpace: 'nowrap',
              }}
            >
              Selected Skills ({selectedCount})
            </span>
          </div>
        )}
      </div>

      {/* Chips grid */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px 8px',
          alignItems: 'flex-start',
        }}
      >
        {skills.map((skill) => (
          <SkillChip
            key={skill}
            label={skill}
            onRemove={onRemove}
            selected={selectedSkills.includes(skill)}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  );
}
