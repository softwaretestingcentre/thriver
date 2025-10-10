import { format } from 'date-fns';

interface DietEntry {
  id: string;
  date: Date;
  mealType: string;
  foodName: string;
  calories: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
  notes: string | null;
}

interface DietEntriesListProps {
  entries: DietEntry[];
}

export default function DietEntriesList({ entries }: DietEntriesListProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b">
        <h2 className="text-xl font-semibold">Recent Entries</h2>
      </div>
      <div className="divide-y">
        {entries.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No diet entries yet. Start logging your meals!
          </div>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="p-4 hover:bg-gray-50 transition">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded capitalize">
                      {entry.mealType}
                    </span>
                    <h3 className="font-medium text-gray-900">{entry.foodName}</h3>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {format(new Date(entry.date), 'MMM d, yyyy h:mm a')}
                  </p>
                  {entry.notes && (
                    <p className="text-sm text-gray-600 mt-2">{entry.notes}</p>
                  )}
                </div>
                <div className="text-right ml-4">
                  {entry.calories && (
                    <p className="font-semibold text-lg text-gray-900">{entry.calories} cal</p>
                  )}
                  <div className="text-xs text-gray-500 space-y-1 mt-1">
                    {entry.protein && <div>Protein: {entry.protein}g</div>}
                    {entry.carbs && <div>Carbs: {entry.carbs}g</div>}
                    {entry.fat && <div>Fat: {entry.fat}g</div>}
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
