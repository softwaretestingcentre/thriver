import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import GoalsList from '@/components/goals/GoalsList';
import CreateGoalButton from '@/components/goals/CreateGoalButton';

export default async function GoalsPage() {
  const user = await getCurrentUser();
  if (!user?.email) {
    redirect('/api/auth/signin');
  }
  const dbUser = await prisma.user.findUnique({
    where: { email: user.email },
    include: {
      goals: {
        orderBy: { createdAt: 'desc' },
      },
      notifications: {
        where: { read: false },
      },
    },
  });
  if (!dbUser) {
    redirect('/api/auth/signin');
  }
  return (
    <DashboardLayout user={dbUser} unreadNotifications={dbUser.notifications.length}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Goals</h1>
            <p className="text-gray-600 mt-2">Track your wellness objectives</p>
          </div>
          <CreateGoalButton />
        </div>

        <GoalsList goals={dbUser.goals} />
      </div>
    </DashboardLayout>
  );
}
