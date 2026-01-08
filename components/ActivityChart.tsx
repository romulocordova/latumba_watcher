
import React from 'react';
import { BarChart, Bar, Cell, XAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { HourlyData } from '../types';

interface ActivityChartProps {
  data: HourlyData[];
}

const ActivityChart: React.FC<ActivityChartProps> = ({ data }) => {
  // Label hours: 12a, 3a, 6a, 9a, 12p, 3p, 6p, 9p
  const formatXAxis = (tick: string) => {
    const hour = parseInt(tick);
    if (hour === 0) return '12a';
    if (hour === 12) return '12p';
    if (hour % 3 === 0) return hour > 12 ? `${hour - 12}p` : `${hour}a`;
    return '';
  };

  return (
    <div className="h-32 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis 
            dataKey="hour" 
            tickFormatter={formatXAxis} 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 10 }}
            interval={2}
          />
          <Tooltip 
            cursor={{ fill: 'transparent' }} 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-slate-800 border border-slate-700 p-1 rounded text-[10px] text-slate-300">
                    {`${payload[0].value}% busy`}
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="value" radius={[2, 2, 0, 0]}>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.isLive ? '#ef4444' : '#3b82f6'} 
                fillOpacity={entry.isLive ? 0.8 : 0.6}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityChart;
