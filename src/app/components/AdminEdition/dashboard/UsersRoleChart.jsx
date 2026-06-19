import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Students', value: 7452 },
  { name: 'Companies', value: 3104 },
  { name: 'Admins', value: 248 },
];

const COLORS = ['#13206d', '#84fba2', '#90baef'];

export function UsersRoleChart() {
  const total = data.reduce((sum, d) => sum + d.value, 0);

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
          marginBottom: 8,
        }}
      >
        Users by Role
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={88}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: 'white',
                border: '1px solid rgba(19,32,109,0.1)',
                borderRadius: 8,
                fontFamily: 'Inter, sans-serif',
                fontSize: 13,
              }}
              formatter={(value) => [value.toLocaleString(), '']}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {data.map((entry, i) => (
          <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: COLORS[i],
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 13,
                color: 'rgba(19,32,109,0.7)',
                fontFamily: 'Inter, sans-serif',
                flex: 1,
              }}
            >
              {entry.name}
            </span>
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#13206d',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {((entry.value / total) * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
