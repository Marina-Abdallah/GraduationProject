import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const defaultData = [
  { day: 'Mon', completed: 0 },
  { day: 'Tue', completed: 0 },
  { day: 'Wed', completed: 0 },
  { day: 'Thu', completed: 0 },
  { day: 'Fri', completed: 0 },
  { day: 'Sat', completed: 0 },
  { day: 'Sun', completed: 0 },
];

export function JobsTrend({ data = defaultData }) {
  return (
    <div
      style={{
        background: 'white',
        borderRadius: 16,
        padding: '24px 28px',
        filter: 'drop-shadow(0px 4px 12px rgba(132,251,162,0.3))',
        flex: 1.4,
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
        Jobs Completed Trend
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid key="jobs-grid" strokeDasharray="3 3" stroke="rgba(19,32,109,0.08)" vertical={false} />
          <XAxis
            key="jobs-x"
            dataKey="day"
            tick={{ fontSize: 12, fill: 'rgba(19,32,109,0.6)', fontFamily: 'Inter, sans-serif' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            key="jobs-y"
            tick={{ fontSize: 12, fill: 'rgba(19,32,109,0.6)', fontFamily: 'Inter, sans-serif' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            key="jobs-tooltip"
            contentStyle={{
              background: 'white',
              border: '1px solid rgba(19,32,109,0.1)',
              borderRadius: 8,
              fontFamily: 'Inter, sans-serif',
              fontSize: 13,
            }}
            cursor={{ fill: 'rgba(132,251,162,0.1)' }}
          />
          <Bar key="jobs-bar" dataKey="completed" name="Completed" fill="#84fba2" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
