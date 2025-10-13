import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ExerciseEntryForm from '@/components/tracking/ExerciseEntryForm';
import ExerciseEntriesList from '@/components/tracking/ExerciseEntriesList';
import ExerciseChart from '@/components/charts/ExerciseChart';
import { subDays } from 'date-fns';

export default async function ExerciseTrackingPage() {
  const user = await getCurrentUser();
  if (!user?.email) {
    redirect('/api/auth/signin');
  }
  const dbUser = await prisma.user.findUnique({
    where: { email: user.email },
    include: {
      exerciseEntries: {
        orderBy: { date: 'desc' },
        take: 50,
      },
      notifications: {
        where: { read: false },
      },
    },
  });
  if (!dbUser) {
    redirect('/api/auth/signin');
  }
  const sevenDaysAgo = subDays(new Date(), 7);
  const recentEntries = dbUser.exerciseEntries.filter(
    entry => new Date(entry.date) >= sevenDaysAgo
  );
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
