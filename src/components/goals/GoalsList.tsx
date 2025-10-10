'use client';

import { useState } from 'react';
import { format } from 'date-fns';

interface Goal {
  id: string;
  title: string;
  description: string | null;
  category: string;
  targetValue: number | null;
  currentValue: number | null;
  unit: string | null;
  targetDate: Date | null;
  status: string;
  createdAt: Date;
}

interface GoalsListProps {
  goals: Goal[];
}

export default function GoalsList({ goals }: GoalsListProps) {
  const [filter, setFilter] = useState<string>('all');
  
  const filteredGoals = goals.filter(goal => {
    if (filter === 'all') return true;
    if (filter === 'active') return goal.status === 'active';
    if (filter === 'completed') return goal.status === 'completed';
    return goal.category === filter;
  });

  const calculateProgress = (current: number | null, target: number | null) => {
    if (!current || !target) return 0;
    return Math.min(Math.round((current / target) * 100), 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'abandoned': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'diet': return '🍎';
      case 'exercise': return '💪';
      case 'lifestyle': return '❤️';
      default: return '🎯';
    }
  };

  return (
    <div>
      <div className="mb-6 flex gap-2 flex-wrap">
        {['all', 'active', 'completed', 'diet', 'exercise', 'lifestyle'].map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === filterOption
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredGoals.map((goal) => {
          const progress = calculateProgress(goal.currentValue, goal.targetValue);
          return (
            <div key={goal.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getCategoryIcon(goal.category)}</span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)} capitalize`}>
                    {goal.status}
                  </span>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  ⋮
                </button>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{goal.title}</h3>
              {goal.description && (
                <p className="text-sm text-gray-600 mb-4">{goal.description}</p>
              )}

              <div className="space-y-3">
                {goal.targetValue && goal.currentValue !== null && (
                  <div>
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
                  </div>
                )}

                <div className="flex items-center justify-between text-sm">
                  {goal.targetDate && (
                    <span className="text-gray-500">
                      Target: {format(new Date(goal.targetDate), 'MMM d, yyyy')}
                    </span>
                  )}
                  <span className="text-gray-500 capitalize">
                    {goal.category}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredGoals.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No goals found for this filter</p>
        </div>
      )}
    </div>
  );
}
