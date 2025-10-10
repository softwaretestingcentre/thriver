import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import NotificationsList from '@/components/notifications/NotificationsList';

export default async function NotificationsPage() {
  const user = await getCurrentUser();
  
  if (!user?.email) {
    redirect('/api/auth/signin');
  }

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email },
    include: {
      notifications: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!dbUser) {
    redirect('/api/auth/signin');
  }

  const unreadCount = dbUser.notifications.filter(n => !n.read).length;

  return (
    <DashboardLayout user={dbUser} unreadNotifications={unreadCount}>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-2">Stay updated on your wellness journey</p>
        </div>

        <NotificationsList notifications={dbUser.notifications} />
      </div>
    </DashboardLayout>
  );
}
