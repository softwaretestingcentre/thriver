'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, parseISO, startOfDay } from 'date-fns';

interface DietEntry {
  date: Date;
  calories: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
}

interface DietChartProps {
  entries: DietEntry[];
}

export default function DietChart({ entries }: DietChartProps) {
  // Aggregate data by date
  const dataByDate = entries.reduce((acc, entry) => {
    const dateKey = format(startOfDay(new Date(entry.date)), 'yyyy-MM-dd');
    if (!acc[dateKey]) {
      acc[dateKey] = {
        date: dateKey,
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      };
    }
    acc[dateKey].calories += entry.calories || 0;
    acc[dateKey].protein += entry.protein || 0;
    acc[dateKey].carbs += entry.carbs || 0;
    acc[dateKey].fat += entry.fat || 0;
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
      <h2 className="text-xl font-semibold mb-4">Daily Nutrition (Last 7 Days)</h2>
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
            <Line type="monotone" dataKey="calories" stroke="#3b82f6" name="Calories" />
            <Line type="monotone" dataKey="protein" stroke="#10b981" name="Protein (g)" />
            <Line type="monotone" dataKey="carbs" stroke="#f59e0b" name="Carbs (g)" />
            <Line type="monotone" dataKey="fat" stroke="#ef4444" name="Fat (g)" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
