import { format } from 'date-fns';

interface ExerciseEntry {
  id: string;
  date: Date;
  exerciseType: string;
  name: string;
  duration: number | null;
  calories: number | null;
  distance: number | null;
  sets: number | null;
  reps: number | null;
  weight: number | null;
  notes: string | null;
}

interface ExerciseEntriesListProps {
  entries: ExerciseEntry[];
}

export default function ExerciseEntriesList({ entries }: ExerciseEntriesListProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b">
        <h2 className="text-xl font-semibold">Recent Workouts</h2>
      </div>
      <div className="divide-y">
        {entries.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No exercise entries yet. Start logging your workouts!
          </div>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="p-4 hover:bg-gray-50 transition">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded capitalize">
                      {entry.exerciseType}
                    </span>
                    <h3 className="font-medium text-gray-900">{entry.name}</h3>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {format(new Date(entry.date), 'MMM d, yyyy h:mm a')}
                  </p>
                  {entry.notes && (
                    <p className="text-sm text-gray-600 mt-2">{entry.notes}</p>
                  )}
                </div>
                <div className="text-right ml-4 text-sm space-y-1">
                  {entry.duration && <div className="text-gray-900"><strong>{entry.duration}</strong> min</div>}
                  {entry.calories && <div className="text-gray-600">{entry.calories} cal</div>}
                  {entry.distance && <div className="text-gray-600">{entry.distance} km</div>}
                  {entry.sets && entry.reps && (
                    <div className="text-gray-600">{entry.sets} × {entry.reps} reps</div>
                  )}
                  {entry.weight && <div className="text-gray-600">{entry.weight} kg</div>}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
