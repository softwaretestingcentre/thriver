import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DietEntryForm from '@/components/tracking/DietEntryForm';
import DietEntriesList from '@/components/tracking/DietEntriesList';
import DietChart from '@/components/charts/DietChart';
import { subDays } from 'date-fns';

export default function DietTrackingPage() {
  const dbUser = {
    name: "Demo User",
    email: "demo@thriver.com",
    image: null,
    dietEntries: [],
    notifications: [],
  };
  const recentEntries: any[] = [];
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
