'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/admin', label: 'الرئيسية', icon: '🏠' },
  { href: '/admin/merchants', label: 'التجار', icon: '🏪' },
  { href: '/admin/more', label: 'المزيد', icon: '☰' },
];

export const BottomNav: React.FC = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border-base z-50">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
              isActive(tab.href)
                ? 'text-primary'
                : 'text-text-secondary'
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="text-xs font-medium">{tab.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};