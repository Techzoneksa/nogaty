"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
/* lucide-react removed - using inline SVGs */

interface SidebarProps {
  currentBusiness?: string;
  onBusinessChange?: (business: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentBusiness = "cafe_noqta",
  onBusinessChange,
}) => {
  const pathname = usePathname();

  const icons: Record<string, React.FC<{ size?: number; className?: string }>> = {
  Home: ({ size = 16, className }) => <svg className={className} width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  Users: ({ size = 16, className }) => <svg className={className} width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  Coins: ({ size = 16, className }) => <svg className={className} width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Gift: ({ size = 16, className }) => <svg className={className} width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>,
  Megaphone: ({ size = 16, className }) => <svg className={className} width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-2.146a2.436 2.436 0 01-.703-.507l-1.5-1.5a2.436 2.436 0 01-.703-.507l-.707-.707a2.436 2.436 0 01-.703-.507L3.41 13.24a1.76 1.76 0 01-.592-3.417V6.882a1.76 1.76 0 01.592-3.417l2.147-2.146a2.436 2.436 0 01.703-.507l1.5-1.5a2.436 2.436 0 01.703-.507l.707-.707a2.436 2.436 0 01.703-.507L8.82 2.29a1.76 1.76 0 013.417-.592V5.88z" /></svg>,
  MapPin: ({ size = 16, className }) => <svg className={className} width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  BarChart3: ({ size = 16, className }) => <svg className={className} width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  CreditCard: ({ size = 16, className }) => <svg className={className} width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
  Layers: ({ size = 16, className }) => <svg className={className} width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
  Wallet: ({ size = 16, className }) => <svg className={className} width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
  Settings: ({ size = 16, className }) => <svg className={className} width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  ChevronDown: ({ size = 14, className }) => <svg className={className} width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>,
  Store: ({ size = 16, className }) => <svg className={className} width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
};

const menuItems = [
  { label: "الرئيسية", path: "/dashboard", iconName: "Home" },
  { label: "العملاء", path: "/dashboard/customers", iconName: "Users" },
  { label: "نظام النقاط", path: "/dashboard/points", iconName: "Coins" },
  { label: "المكافآت", path: "/dashboard/rewards", iconName: "Gift" },
  { label: "الحملات", path: "/dashboard/campaigns", iconName: "Megaphone" },
  { label: "الفروع", path: "/dashboard/branches", iconName: "MapPin" },
  { label: "التقارير", path: "/dashboard/reports", iconName: "BarChart3" },
  { label: "صفحة العميل", path: "/dashboard/customer-page", iconName: "CreditCard" },
  { label: "التكاملات", path: "/dashboard/integrations", iconName: "Layers" },
  { label: "الاشتراك والخطط", path: "/dashboard/billing", iconName: "Wallet" },
  { label: "الإعدادات", path: "/dashboard/settings", iconName: "Settings" },
];

  const businesses = [
    { id: "cafe_noqta", name: "كافيه نقطة", type: "كافيه" },
    { id: "restaurant_mazaq", name: "مطعم مذاق", type: "مطعم" },
    { id: "supermarket_hay", name: "سوبرماركت الحي", type: "سوبرماركت" },
  ];

  const activeBusiness = businesses.find((b) => b.id === currentBusiness) || businesses[0];

  return (
    <aside className="w-64 bg-white border-l border-border-base h-screen sticky top-0 flex flex-col justify-between shrink-0 hidden lg:flex select-none">
      <div className="flex flex-col flex-1 min-h-0">
        {/* Logo and powered by */}
        <div className="p-5 border-b border-border-base flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-black text-primary tracking-tight">nogaty</span>
            <span className="text-[10px] text-text-secondary font-bold">
              بواسطة Jad Cloud
            </span>
          </div>
          <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
            SaaS
          </span>
        </div>

        {/* Business Switcher */}
        <div className="p-4 border-b border-border-base relative group">
          <button className="w-full flex items-center justify-between p-2.5 rounded-xl border border-border-base bg-bg-base/50 hover:bg-bg-base transition-colors text-right cursor-pointer">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center">
                <icons.Store size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-text-primary">
                  {activeBusiness.name}
                </span>
                <span className="text-[10px] text-text-secondary">
                  {activeBusiness.type}
                </span>
              </div>
            </div>
            <icons.ChevronDown size={14} className="text-text-secondary" />
          </button>
          
          {/* Dropdown Menu (UI Simulation) */}
          <div className="absolute right-4 left-4 mt-1 bg-white border border-border-base rounded-xl shadow-lg p-1 hidden group-hover:block z-20">
            {businesses.map((b) => (
              <button
                key={b.id}
                onClick={() => onBusinessChange?.(b.id)}
                className={`w-full text-right text-xs p-2 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer ${
                  b.id === currentBusiness ? "text-primary font-bold bg-primary-light/30" : "text-text-primary"
                }`}
              >
                <span>{b.name}</span>
                <span className="text-[10px] text-text-secondary font-normal">
                  {b.type}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            const IconComponent = icons[item.iconName];
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-primary text-white shadow-xs"
                    : "text-text-secondary hover:text-text-primary hover:bg-bg-base"
                }`}
              >
                <IconComponent size={16} className={isActive ? "text-white" : "text-text-secondary"} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-border-base bg-bg-base/30 text-center">
        <div className="text-[10px] text-text-secondary font-medium">
          الحساب: منشأة تجارية نشطة
        </div>
        <Link
          href="/"
          className="inline-block mt-1 text-[10px] text-primary hover:underline font-bold"
        >
          خروج من لوحة التحكم
        </Link>
      </div>
    </aside>
  );
};
