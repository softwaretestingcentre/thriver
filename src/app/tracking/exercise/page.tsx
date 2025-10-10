import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ExerciseEntryForm from '@/components/tracking/ExerciseEntryForm';
import ExerciseEntriesList from '@/components/tracking/ExerciseEntriesList';
import ExerciseChart from '@/components/charts/ExerciseChart';
import { subDays } from 'date-fns';

export default function ExerciseTrackingPage() {
  const dbUser = {
    name: "Demo User",
    email: "demo@thriver.com",
    image: null,
    exerciseEntries: [],
    notifications: [],
  };
  const recentEntries: any[] = [];
  return (
    <DashboardLayout user={dbUser} unreadNotifications={dbUser.notifications.length}>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Exercise Tracking</h1>
          <p className="text-gray-600 mt-2">Log your workouts and monitor your activity</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-1">
            <ExerciseEntryForm />
          </div>
          <div className="lg:col-span-2">
            <ExerciseChart entries={recentEntries} />
          </div>
        </div>

        <ExerciseEntriesList entries={dbUser.exerciseEntries} />
      </div>
    </DashboardLayout>
  );
}
