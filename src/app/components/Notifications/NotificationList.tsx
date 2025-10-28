import React from "react";

export type Notification = {
  id: string;
  message: string;
  type: string;
  createdAt: string;
};

interface NotificationListProps {
  notifications: Notification[];
  onDelete: (id: string) => void;
}

const NotificationList: React.FC<Partial<NotificationListProps>> = ({ notifications, onDelete }) => {
  if (!notifications || notifications.length === 0) {
    return <div role="status">{t('No notifications')}</div>;
  }
  return (
    <div>
      <h2>{t('Notifications')}</h2>
      <ul role="list">
        {notifications.map((n) => (
          <li key={n.id} role="listitem">
            <span>{n.message}</span>
            {onDelete && (
              <button onClick={() => onDelete(n.id)} aria-label={t('Delete notification {{id}}', { id: n.id })}>{t('Delete')}</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

function t(str: string, vars?: Record<string, any>) {
  // Simple i18n mock: replace {{var}} in string
  if (!vars) return str;
  return str.replace(/{{(\w+)}}/g, (_, k) => vars[k] ?? '');
}

export default NotificationList;
