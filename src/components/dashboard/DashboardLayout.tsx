'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
  user: {
    name: string | null;
    email: string;
    image: string | null;
  };
  unreadNotifications?: number;
}

export default function DashboardLayout({ children, user, unreadNotifications = 0 }: DashboardLayoutProps) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Goals', href: '/goals', icon: '🎯' },
    { name: 'Diet', href: '/tracking/diet', icon: '🍎' },
    { name: 'Exercise', href: '/tracking/exercise', icon: '💪' },
    { name: 'Lifestyle', href: '/tracking/lifestyle', icon: '❤️' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/dashboard" className="flex items-center">
                <span className="text-2xl font-bold text-blue-600">Thriver</span>
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      pathname === item.href
                        ? 'border-blue-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                href="/notifications" 
                className="relative p-2 text-gray-400 hover:text-gray-500"
              >
                🔔
                {unreadNotifications > 0 && (
                  <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </Link>
              <div className="flex items-center gap-2">
                {user.image ? (
                  <img src={user.image} alt={user.name || 'User'} className="h-8 w-8 rounded-full" />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                    {user.name?.[0] || user.email[0].toUpperCase()}
                  </div>
                )}
                <Link href="/api/auth/signout" className="text-sm text-gray-700 hover:text-gray-900">
                  Sign Out
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}
