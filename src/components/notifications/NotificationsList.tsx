'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: Date;
}

interface NotificationsListProps {
  notifications: Notification[];
}

export default function NotificationsList({ notifications }: NotificationsListProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();

  const markAsRead = async (id: string) => {
    setLoading(id);
    try {
      const response = await fetch(`/api/notifications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: true }),
      });

      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    } finally {
      setLoading(null);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'error': return 'bg-red-50 border-red-200';
      default: return 'bg-blue-50 border-blue-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      default: return 'ℹ️';
    }
  };

  return (
    <div className="space-y-4">
      {notifications.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500 text-lg">No notifications yet</p>
          <p className="text-gray-400 text-sm mt-2">We'll notify you about important updates</p>
        </div>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className={`border rounded-lg p-4 transition ${getTypeColor(notification.type)} ${
              !notification.read ? 'shadow-md' : 'opacity-75'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{getTypeIcon(notification.type)}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {notification.title}
                      {!notification.read && (
                        <span className="ml-2 inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                      )}
                    </h3>
                    <p className="text-gray-700 text-sm">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {format(new Date(notification.createdAt), 'MMM d, yyyy h:mm a')}
                    </p>
                  </div>
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      disabled={loading === notification.id}
                      className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 transition disabled:opacity-50"
                    >
                      {loading === notification.id ? 'Marking...' : 'Mark as read'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
