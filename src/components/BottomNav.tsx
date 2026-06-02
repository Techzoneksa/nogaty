"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
/* lucide-react removed - using inline SVGs */

export const BottomNav: React.FC = () => {
  const pathname = usePathname();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const icons: Record<string, React.FC<{ size?: number; className?: string }>> = {
  Home: ({ size = 20, className }) => <svg className={className} width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  Users: ({ size = 20, className }) => <svg className={className} width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  Coins: ({ size = 20, className }) => <svg className={className} width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Gift: ({ size = 20, className }) => <svg className={className} width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>,
  MoreHorizontal: ({ size = 20, className }) => <svg className={className} width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>,
  Megaphone: ({ size = 20, className }) => <svg className={className} width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-2.146a2.436 2.436 0 01-.703-.507l-1.5-1.5a2.436 2.436 0 01-.703-.507l-.707-.707a2.436 2.436 0 01-.703-.507L3.41 13.24a1.76 1.76 0 01-.592-3.417V6.882a1.76 1.76 0 01.592-3.417l2.147-2.146a2.436 2.436 0 01.703-.507l1.5-1.5a2.436 2.436 0 01.703-.507l.707-.707a2.436 2.436 0 01.703-.507L8.82 2.29a1.76 1.76 0 013.417-.592V5.88z" /></svg>,
  MapPin: ({ size = 20, className }) => <svg className={className} width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  BarChart3: ({ size = 20, className }) => <svg className={className} width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  CreditCard: ({ size = 20, className }) => <svg className={className} width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
  Layers: ({ size = 20, className }) => <svg className={className} width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
  Wallet: ({ size = 20, className }) => <svg className={className} width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
  Settings: ({ size = 20, className }) => <svg className={className} width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  X: ({ size = 20, className }) => <svg className={className} width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
  LogOut: ({ size = 20, className }) => <svg className={className} width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>,
};

const mainNav = [
  { label: "الرئيسية", path: "/dashboard", iconName: "Home" },
  { label: "العملاء", path: "/dashboard/customers", iconName: "Users" },
  { label: "النقاط", path: "/dashboard/points", iconName: "Coins" },
  { label: "المكافآت", path: "/dashboard/rewards", iconName: "Gift" },
];

const secondaryNav = [
  { label: "الحملات التسويقية", path: "/dashboard/campaigns", iconName: "Megaphone" },
  { label: "الفروع والمواقع", path: "/dashboard/branches", iconName: "MapPin" },
  { label: "التقارير والأداء", path: "/dashboard/reports", iconName: "BarChart3" },
  { label: "صفحة العميل (Loyalty Card)", path: "/dashboard/customer-page", iconName: "CreditCard" },
  { label: "التكاملات والربط", path: "/dashboard/integrations", iconName: "Layers" },
  { label: "الاشتراك والخطط", path: "/dashboard/billing", iconName: "Wallet" },
  { label: "الإعدادات العامة", path: "/dashboard/settings", iconName: "Settings" },
];

  return (
    <>
      {/* Bottom Nav Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-border-base flex items-center justify-around px-2 z-30 shadow-lg select-none">
        {mainNav.map((item) => {
          const isActive = pathname === item.path;
          const IconComponent = icons[item.iconName];
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center justify-center gap-1 w-16 h-full transition-colors cursor-pointer ${
                isActive ? "text-primary" : "text-text-secondary"
              }`}
            >
              <IconComponent size={20} className={isActive ? "stroke-[2.5px]" : "stroke-[2px]"} />
              <span className={`text-[10px] font-bold ${isActive ? "font-black" : ""}`}>
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* More Button */}
        <button
          onClick={() => setIsMoreOpen(true)}
          className={`flex flex-col items-center justify-center gap-1 w-16 h-full transition-colors cursor-pointer ${
            isMoreOpen || secondaryNav.some((item) => pathname === item.path)
              ? "text-primary"
              : "text-text-secondary"
          }`}
        >
          <icons.MoreHorizontal size={20} />
          <span className="text-[10px] font-bold">المزيد</span>
        </button>
      </div>

      {/* More Drawer Overlay */}
      {isMoreOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end select-none">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setIsMoreOpen(false)}
          />

          {/* Drawer Content */}
          <div className="bg-white rounded-t-3xl border-t border-border-base p-5 z-10 max-h-[80vh] overflow-y-auto flex flex-col gap-4 transform transition-transform duration-300">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border-base">
              <div className="flex flex-col">
                <span className="text-sm font-black text-text-primary">لوحة التحكم</span>
                <span className="text-[10px] text-text-secondary">روابط الوصول السريع</span>
              </div>
              <button
                onClick={() => setIsMoreOpen(false)}
                className="p-1.5 rounded-lg bg-bg-base text-text-secondary cursor-pointer"
              >
                <icons.X size={16} />
              </button>
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-2 gap-2 my-2">
              {secondaryNav.map((item) => {
                const isActive = pathname === item.path;
                const IconComponent = icons[item.iconName];
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsMoreOpen(false)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-right transition-all ${
                      isActive
                        ? "bg-primary/5 border-primary text-primary font-bold"
                        : "bg-bg-base/30 border-border-base text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    <IconComponent size={16} className={isActive ? "text-primary" : "text-text-secondary"} />
                    <span className="text-xs font-bold">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Logout Button */}
            <Link
              href="/"
              onClick={() => setIsMoreOpen(false)}
              className="flex items-center justify-center gap-2 py-3 rounded-xl border border-red-200 bg-red-50 text-red-600 font-bold text-xs"
            >
              <icons.LogOut size={16} />
              <span>تسجيل الخروج</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
