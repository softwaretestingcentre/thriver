import { format } from 'date-fns';

interface DietEntry {
  id: string;
  date: Date;
  mealType: string;
  foodName: string;
  calories: number | null;
}

interface ExerciseEntry {
  id: string;
  date: Date;
  exerciseType: string;
  name: string;
  duration: number | null;
}

interface LifestyleEntry {
  id: string;
  date: Date;
  category: string;
  value: number;
  unit: string | null;
}

interface RecentActivityProps {
  dietEntries: DietEntry[];
  exerciseEntries: ExerciseEntry[];
  lifestyleEntries: LifestyleEntry[];
}

export default function RecentActivity({ dietEntries, exerciseEntries, lifestyleEntries }: RecentActivityProps) {
  // Combine and sort all entries by date
  const allActivities = [
    ...dietEntries.map(e => ({ ...e, type: 'diet' as const })),
    ...exerciseEntries.map(e => ({ ...e, type: 'exercise' as const })),
    ...lifestyleEntries.map(e => ({ ...e, type: 'lifestyle' as const })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10);

  const getActivityIcon = (type: 'diet' | 'exercise' | 'lifestyle') => {
    switch (type) {
      case 'diet': return '🍎';
      case 'exercise': return '💪';
      case 'lifestyle': return '❤️';
    }
  };

  const getActivityColor = (type: 'diet' | 'exercise' | 'lifestyle') => {
    switch (type) {
      case 'diet': return 'bg-green-100 text-green-800';
      case 'exercise': return 'bg-blue-100 text-blue-800';
      case 'lifestyle': return 'bg-red-100 text-red-800';
    }
  };

  const getActivityDescription = (activity: any) => {
    switch (activity.type) {
      case 'diet':
        return `${activity.mealType}: ${activity.foodName}${activity.calories ? ` (${activity.calories} cal)` : ''}`;
      case 'exercise':
        return `${activity.name}${activity.duration ? ` - ${activity.duration} min` : ''}`;
      case 'lifestyle':
        return `${activity.category}: ${activity.value}${activity.unit || ''}`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
      {allActivities.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No activity recorded yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {allActivities.map((activity) => (
            <div key={`${activity.type}-${activity.id}`} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
              <div className="flex-shrink-0 mt-1">
                <span className="text-2xl">{getActivityIcon(activity.type)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {getActivityDescription(activity)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {format(new Date(activity.date), 'MMM d, yyyy h:mm a')}
                </p>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getActivityColor(activity.type)} capitalize`}>
                {activity.type}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
