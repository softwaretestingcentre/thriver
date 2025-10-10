'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, parseISO, startOfDay } from 'date-fns';

interface ExerciseEntry {
  date: Date;
  duration: number | null;
  calories: number | null;
  distance: number | null;
}

interface ExerciseChartProps {
  entries: ExerciseEntry[];
}

export default function ExerciseChart({ entries }: ExerciseChartProps) {
  const dataByDate = entries.reduce((acc, entry) => {
    const dateKey = format(startOfDay(new Date(entry.date)), 'yyyy-MM-dd');
    if (!acc[dateKey]) {
      acc[dateKey] = {
        date: dateKey,
        duration: 0,
        calories: 0,
        distance: 0,
      };
    }
    acc[dateKey].duration += entry.duration || 0;
    acc[dateKey].calories += entry.calories || 0;
    acc[dateKey].distance += entry.distance || 0;
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
      <h2 className="text-xl font-semibold mb-4">Daily Activity (Last 7 Days)</h2>
      {chartData.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-gray-500">
          No data available for chart
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="duration" fill="#3b82f6" name="Duration (min)" />
            <Bar dataKey="calories" fill="#10b981" name="Calories" />
            <Bar dataKey="distance" fill="#f59e0b" name="Distance (km)" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
