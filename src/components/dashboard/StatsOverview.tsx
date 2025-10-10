interface StatsOverviewProps {
  stats: {
    dietEntries: number;
    exerciseEntries: number;
    lifestyleEntries: number;
    activeGoals: number;
  };
}

export default function StatsOverview({ stats }: StatsOverviewProps) {
  const statCards = [
    { 
      name: 'Diet Entries', 
      value: stats.dietEntries, 
      icon: '🍎',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    { 
      name: 'Exercise Sessions', 
      value: stats.exerciseEntries, 
      icon: '💪',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    { 
      name: 'Lifestyle Logs', 
      value: stats.lifestyleEntries, 
      icon: '❤️',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600'
    },
    { 
      name: 'Active Goals', 
      value: stats.activeGoals, 
      icon: '🎯',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat) => (
        <div key={stat.name} className={`${stat.bgColor} overflow-hidden rounded-lg shadow`}>
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-3xl">{stat.icon}</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-600 truncate">{stat.name}</dt>
                  <dd className={`text-3xl font-semibold ${stat.textColor}`}>{stat.value}</dd>
                </dl>
                <p className="text-xs text-gray-500 mt-1">Last 7 days</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
