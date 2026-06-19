import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { day: 'Mon', users: 120, jobs: 45 },
  { day: 'Tue', users: 180, jobs: 62 },
  { day: 'Wed', users: 156, jobs: 58 },
  { day: 'Thu', users: 210, jobs: 79 },
  { day: 'Fri', users: 195, jobs: 91 },
  { day: 'Sat', users: 240, jobs: 83 },
  { day: 'Sun', users: 198, jobs: 67 },
];

export function AnalyticsChart() {
  return (
    <div
      style={{
        background: 'white',
        borderRadius: 16,
        padding: '24px 28px',
        filter: 'drop-shadow(0px 4px 12px rgba(132,251,162,0.3))',
        flex: 1.6,
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
        Platform Overview — Last 7 Days
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid key="analytics-grid" strokeDasharray="3 3" stroke="rgba(19,32,109,0.08)" />
          <XAxis
            key="analytics-x"
            dataKey="day"
            tick={{ fontSize: 12, fill: 'rgba(19,32,109,0.6)', fontFamily: 'Inter, sans-serif' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            key="analytics-y"
            tick={{ fontSize: 12, fill: 'rgba(19,32,109,0.6)', fontFamily: 'Inter, sans-serif' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            key="analytics-tooltip"
            contentStyle={{
              background: 'white',
              border: '1px solid rgba(19,32,109,0.1)',
              borderRadius: 8,
              fontFamily: 'Inter, sans-serif',
              fontSize: 13,
            }}
          />
          <Legend
            key="analytics-legend"
            wrapperStyle={{ fontSize: 13, fontFamily: 'Inter, sans-serif', paddingTop: 12 }}
          />
          <Line
            key="analytics-line-users"
            type="monotone"
            dataKey="users"
            stroke="#13206d"
            strokeWidth={2.5}
            dot={{ fill: '#13206d', r: 4 }}
            activeDot={{ r: 6 }}
            name="New Users"
          />
          <Line
            key="analytics-line-jobs"
            type="monotone"
            dataKey="jobs"
            stroke="#84fba2"
            strokeWidth={2.5}
            dot={{ fill: '#84fba2', r: 4 }}
            activeDot={{ r: 6 }}
            name="Jobs Posted"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
