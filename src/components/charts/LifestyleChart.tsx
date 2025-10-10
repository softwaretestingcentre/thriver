'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, parseISO, startOfDay } from 'date-fns';

interface LifestyleEntry {
  date: Date;
  category: string;
  value: number;
}

interface LifestyleChartProps {
  entries: LifestyleEntry[];
}

export default function LifestyleChart({ entries }: LifestyleChartProps) {
  // Group entries by category and date
  const dataByDate = entries.reduce((acc, entry) => {
    const dateKey = format(startOfDay(new Date(entry.date)), 'yyyy-MM-dd');
    if (!acc[dateKey]) {
      acc[dateKey] = {
        date: dateKey,
        sleep: null,
        water: null,
        mood: null,
        stress: null,
        weight: null,
      };
    }
    // Take the average if multiple entries on same day
    if (acc[dateKey][entry.category] === null) {
      acc[dateKey][entry.category] = entry.value;
    } else {
      acc[dateKey][entry.category] = (acc[dateKey][entry.category] + entry.value) / 2;
    }
    return acc;
  }, {} as Record<string, any>);

  const chartData = Object.values(dataByDate).sort((a: any, b: any) => 
    a.date.localeCompare(b.date)
  ).map((item: any) => ({
    ...item,
    date: format(parseISO(item.date), 'MMM d'),
  }));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Lifestyle Trends (Last 7 Days)</h2>
      {chartData.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-gray-500">
          No data available for chart
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sleep" stroke="#8b5cf6" name="Sleep (hrs)" />
            <Line type="monotone" dataKey="water" stroke="#3b82f6" name="Water (L)" />
            <Line type="monotone" dataKey="mood" stroke="#fbbf24" name="Mood (1-10)" />
            <Line type="monotone" dataKey="stress" stroke="#ef4444" name="Stress (1-10)" />
            <Line type="monotone" dataKey="weight" stroke="#10b981" name="Weight (kg)" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
