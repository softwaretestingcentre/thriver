import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StatsOverview from '@/components/dashboard/StatsOverview';
import RecentActivity from '@/components/dashboard/RecentActivity';
import GoalsProgress from '@/components/dashboard/GoalsProgress';
import { format, subDays } from 'date-fns';

export default function DashboardPage() {
  const dbUser = {
    name: "Demo User",
    email: "demo@thriver.com",
    image: null,
    goals: [],
    dietEntries: [],
    exerciseEntries: [],
    lifestyleEntries: [],
    notifications: [],
  };
  const weeklyStats = {
    dietEntries: 0,
    exerciseEntries: 0,
    lifestyleEntries: 0,
    activeGoals: 0,
  };
  return (
    <DashboardLayout user={dbUser} unreadNotifications={0}>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {dbUser.name || 'User'}!</h1>
          <p className="text-gray-600 mt-2">Here's your wellness overview</p>
        </div>

        <StatsOverview stats={weeklyStats} />

        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          <GoalsProgress goals={dbUser.goals} />
          <RecentActivity 
            dietEntries={dbUser.dietEntries}
            exerciseEntries={dbUser.exerciseEntries}
            lifestyleEntries={dbUser.lifestyleEntries}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
