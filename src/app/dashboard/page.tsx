import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StatsOverview from '@/components/dashboard/StatsOverview';
import RecentActivity from '@/components/dashboard/RecentActivity';
import GoalsProgress from '@/components/dashboard/GoalsProgress';
import { format, subDays } from 'date-fns';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user?.email) {
    redirect('/api/auth/signin');
  }
  const dbUser = await prisma.user.findUnique({
    where: { email: user.email },
    include: {
      goals: {
        where: { status: 'active' },
        orderBy: { createdAt: 'desc' },
        take: 5,
      },
      dietEntries: {
        orderBy: { date: 'desc' },
        take: 5,
      },
      exerciseEntries: {
        orderBy: { date: 'desc' },
        take: 5,
      },
      lifestyleEntries: {
        orderBy: { date: 'desc' },
        take: 5,
      },
      notifications: {
        where: { read: false },
        orderBy: { createdAt: 'desc' },
      },
    },
  });
  if (!dbUser) {
    redirect('/api/auth/signin');
  }
  const sevenDaysAgo = subDays(new Date(), 7);
  const weeklyStats = {
    dietEntries: await prisma.dietEntry.count({
      where: {
        userId: dbUser.id,
        date: { gte: sevenDaysAgo },
      },
    }),
    exerciseEntries: await prisma.exerciseEntry.count({
      where: {
        userId: dbUser.id,
        date: { gte: sevenDaysAgo },
      },
    }),
    lifestyleEntries: await prisma.lifestyleEntry.count({
      where: {
        userId: dbUser.id,
        date: { gte: sevenDaysAgo },
      },
    }),
    activeGoals: dbUser.goals.length,
  };
  return (
    <DashboardLayout user={dbUser} unreadNotifications={dbUser.notifications.length}>
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
