import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import LifestyleEntryForm from '@/components/tracking/LifestyleEntryForm';
import LifestyleEntriesList from '@/components/tracking/LifestyleEntriesList';
import LifestyleChart from '@/components/charts/LifestyleChart';
import { subDays } from 'date-fns';

export default function LifestyleTrackingPage() {
  const dbUser = {
    name: "Demo User",
    email: "demo@thriver.com",
    image: null,
    lifestyleEntries: [],
    notifications: [],
  };
  const recentEntries: any[] = [];
  return (
    <DashboardLayout user={dbUser} unreadNotifications={dbUser.notifications.length}>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Lifestyle Tracking</h1>
          <p className="text-gray-600 mt-2">Monitor your sleep, hydration, mood, and wellness</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-1">
            <LifestyleEntryForm />
          </div>
          <div className="lg:col-span-2">
            <LifestyleChart entries={recentEntries} />
          </div>
        </div>

        <LifestyleEntriesList entries={dbUser.lifestyleEntries} />
      </div>
    </DashboardLayout>
  );
}
