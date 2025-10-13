import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DietEntryForm from '@/components/tracking/DietEntryForm';
import DietEntriesList from '@/components/tracking/DietEntriesList';
import DietChart from '@/components/charts/DietChart';
import { subDays } from 'date-fns';

export default async function DietTrackingPage() {
  const user = await getCurrentUser();
  if (!user?.email) {
    redirect('/api/auth/signin');
  }
  const dbUser = await prisma.user.findUnique({
    where: { email: user.email },
    include: {
      dietEntries: {
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
  const recentEntries = dbUser.dietEntries.filter(
    entry => new Date(entry.date) >= sevenDaysAgo
  );
  return (
    <DashboardLayout user={dbUser} unreadNotifications={dbUser.notifications.length}>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Diet Tracking</h1>
          <p className="text-gray-600 mt-2">Log your meals and monitor your nutrition</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-1">
            <DietEntryForm />
          </div>
          <div className="lg:col-span-2">
            <DietChart entries={recentEntries} />
          </div>
        </div>

        <DietEntriesList entries={dbUser.dietEntries} />
      </div>
    </DashboardLayout>
  );
}
