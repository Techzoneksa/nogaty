"use client";

import React, { useState } from "react";
/* lucide-react removed - using inline SVGs */
import Link from "next/link";

interface TopbarProps {
  onMenuToggle?: () => void;
  businessName?: string;
}

export const Topbar: React.FC<TopbarProps> = ({
  onMenuToggle,
  businessName = "كافيه نقطة",
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-white border-b border-border-base h-16 sticky top-0 z-30 px-4 md:px-6 flex items-center justify-between select-none">
      {/* Mobile Drawer Trigger & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-xl border border-border-base hover:bg-bg-base text-text-primary cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        <div className="flex flex-col lg:hidden">
          <span className="text-sm font-extrabold text-primary tracking-tight">nogaty</span>
          <span className="text-[9px] text-text-secondary font-bold">{businessName}</span>
        </div>
      </div>

      {/* Desktop Search Bar */}
      <div className="hidden md:flex items-center relative w-80">
        <span className="absolute right-3 text-text-secondary pointer-events-none">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </span>
        <input
          type="text"
          placeholder="ابحث عن عميل، مكافأة أو فرع..."
          className="w-full bg-bg-base/70 border border-border-base rounded-xl py-1.5 pr-9 pl-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
      </div>

      {/* Right side: Notifications & Profile */}
      <div className="flex items-center gap-3">
        {/* Connection Notice */}
        <div className="hidden lg:flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg px-2.5 py-1 text-[10px] font-bold">
          <svg className="w-3 h-3 text-emerald-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
          <span>جاهز للربط المستقبلي</span>
        </div>

        {/* Notifications Icon */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="p-2 rounded-xl border border-border-base hover:bg-bg-base text-text-secondary hover:text-text-primary transition-colors cursor-pointer relative"
          >
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            <span className="absolute top-1 left-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white animate-ping" />
            <span className="absolute top-1 left-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white" />
          </button>

          {/* Notifications Dropdown Simulation */}
          {showNotifications && (
            <div className="absolute left-0 mt-2 w-80 bg-white border border-border-base rounded-2xl shadow-xl p-3 z-40 text-right">
              <div className="flex items-center justify-between pb-2 border-b border-border-base">
                <span className="text-xs font-bold text-text-primary">التنبيهات الأخيره</span>
                <button className="text-[10px] text-primary hover:underline font-semibold cursor-pointer">
                  قراءة الكل
                </button>
              </div>
              <div className="flex flex-col gap-2 mt-2 max-h-60 overflow-y-auto">
                <div className="p-2 hover:bg-bg-base rounded-xl transition-colors text-right cursor-pointer">
                  <div className="text-[11px] font-bold text-text-primary">
                    عميل جديد انضم للبرنامج
                  </div>
                  <div className="text-[10px] text-text-secondary mt-0.5">
                    انضم العميل محمد علي من فرع السليمانية
                  </div>
                  <span className="text-[9px] text-text-secondary/70">منذ دقيقتين</span>
                </div>
                <div className="p-2 hover:bg-bg-base rounded-xl transition-colors text-right cursor-pointer">
                  <div className="text-[11px] font-bold text-text-primary">
                    استبدال مكافأة بنجاح
                  </div>
                  <div className="text-[10px] text-text-secondary mt-0.5">
                    استبدل العميل سارة أحمد كوبون خصم 15% مقابل 150 نقطة
                  </div>
                  <span className="text-[9px] text-text-secondary/70">منذ ساعة</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1 border border-border-base rounded-full hover:bg-bg-base transition-colors cursor-pointer"
          >
            {/* Simple Letter Avatar */}
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs">
              مد
            </div>
            <span className="hidden sm:inline text-xs font-bold text-text-primary px-1">
              مدير النظام
            </span>
          </button>

          {/* Profile Dropdown Simulation */}
          {showProfileMenu && (
            <div className="absolute left-0 mt-2 w-48 bg-white border border-border-base rounded-2xl shadow-xl p-1.5 z-40 text-right">
              <div className="p-2 border-b border-border-base text-right">
                <div className="text-xs font-bold text-text-primary">عبد الرحمن صالح</div>
                <div className="text-[10px] text-text-secondary mt-0.5">
                  admin@jadcloud.com
                </div>
              </div>
              <div className="flex flex-col gap-0.5 mt-1.5">
                <Link
                  href="/dashboard/settings"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2.5 p-2 text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <svg className="w-[14px] h-[14px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  <span>الملف الشخصي</span>
                </Link>
                <Link
                  href="/"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2.5 p-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <svg className="w-[14px] h-[14px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                  <span>تسجيل الخروج</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
