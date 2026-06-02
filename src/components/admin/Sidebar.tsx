'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/lib/i18n/useTranslation';

const navItems = [
  { href: '/admin', label: 'الرئيسية', icon: '🏠' },
  { href: '/admin/merchants', label: 'التجار', icon: '🏪' },
  { href: '/admin/packages', label: 'الباقات', icon: '📦' },
  { href: '/admin/subscriptions', label: 'الاشتراكات', icon: '📋' },
  { href: '/admin/reports', label: 'التقارير', icon: '📊' },
  { href: '/admin/settings', label: 'الإعدادات', icon: '⚙️' },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { t } = useTranslation();

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <aside className="hidden lg:flex flex-col w-64 bg-white border-l border-border-base min-h-screen sticky top-0">
        <div className="p-6 border-b border-border-base">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white text-xl font-bold">
              ج
            </div>
            <div>
              <h1 className="text-lg font-bold text-text-primary">JAD CLOUD</h1>
              <p className="text-xs text-text-secondary">لوحة التحكم</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive(item.href)
                      ? 'bg-primary text-white'
                      : 'text-text-secondary hover:bg-bg-base hover:text-text-primary'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-border-base">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-9 h-9 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-sm font-bold">
              أ
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-text-primary">أحمد محمد</p>
              <p className="text-xs text-text-secondary">مدير النظام</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};