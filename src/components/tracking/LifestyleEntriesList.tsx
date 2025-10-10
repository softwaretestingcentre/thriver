import { format } from 'date-fns';

interface LifestyleEntry {
  id: string;
  date: Date;
  category: string;
  value: number;
  unit: string | null;
  notes: string | null;
}

interface LifestyleEntriesListProps {
  entries: LifestyleEntry[];
}

export default function LifestyleEntriesList({ entries }: LifestyleEntriesListProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'sleep': return '😴';
      case 'water': return '💧';
      case 'mood': return '😊';
      case 'stress': return '😰';
      case 'weight': return '⚖️';
      default: return '📊';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'sleep': return 'bg-purple-100 text-purple-800';
      case 'water': return 'bg-blue-100 text-blue-800';
      case 'mood': return 'bg-yellow-100 text-yellow-800';
      case 'stress': return 'bg-red-100 text-red-800';
      case 'weight': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b">
        <h2 className="text-xl font-semibold">Recent Entries</h2>
      </div>
      <div className="divide-y">
        {entries.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No lifestyle entries yet. Start logging your wellness!
          </div>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="p-4 hover:bg-gray-50 transition">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <span className="text-2xl mt-1">{getCategoryIcon(entry.category)}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded capitalize ${getCategoryColor(entry.category)}`}>
                        {entry.category}
                      </span>
                      <span className="font-medium text-gray-900">
                        {entry.value} {entry.unit}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {format(new Date(entry.date), 'MMM d, yyyy h:mm a')}
                    </p>
                    {entry.notes && (
                      <p className="text-sm text-gray-600 mt-2">{entry.notes}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
