import Link from 'next/link';
import { format } from 'date-fns';

interface Goal {
  id: string;
  title: string;
  category: string;
  targetValue: number | null;
  currentValue: number | null;
  unit: string | null;
  targetDate: Date | null;
}

interface GoalsProgressProps {
  goals: Goal[];
}

export default function GoalsProgress({ goals }: GoalsProgressProps) {
  const calculateProgress = (current: number | null, target: number | null) => {
    if (!current || !target) return 0;
    return Math.min(Math.round((current / target) * 100), 100);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Active Goals</h2>
        <Link href="/goals" className="text-sm text-blue-600 hover:text-blue-700">
          View all →
        </Link>
      </div>
      {goals.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No active goals yet</p>
          <Link href="/goals" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Create Your First Goal
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {goals.map((goal) => {
            const progress = calculateProgress(goal.currentValue, goal.targetValue);
            return (
              <div key={goal.id} className="border-b pb-4 last:border-b-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">{goal.title}</h3>
                    <p className="text-sm text-gray-500 capitalize">{goal.category}</p>
                  </div>
                  {goal.targetDate && (
                    <span className="text-xs text-gray-500">
                      Due: {format(new Date(goal.targetDate), 'MMM d, yyyy')}
                    </span>
                  )}
                </div>
                {goal.targetValue && goal.currentValue !== null && (
                  <>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">
                        {goal.currentValue} / {goal.targetValue} {goal.unit}
                      </span>
                      <span className="font-medium text-blue-600">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
