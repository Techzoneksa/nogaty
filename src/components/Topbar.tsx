"use client";

import React, { useState } from "react";
import { Bell, Search, Menu, LogOut, User, Sparkles } from "lucide-react";
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
          <Menu size={20} />
        </button>
        <div className="flex flex-col lg:hidden">
          <span className="text-sm font-extrabold text-primary tracking-tight">nogaty</span>
          <span className="text-[9px] text-text-secondary font-bold">{businessName}</span>
        </div>
      </div>

      {/* Desktop Search Bar */}
      <div className="hidden md:flex items-center relative w-80">
        <span className="absolute right-3 text-text-secondary pointer-events-none">
          <Search size={16} />
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
          <Sparkles size={12} className="text-emerald-600 animate-pulse" />
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
            <Bell size={18} />
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
                  <User size={14} />
                  <span>الملف الشخصي</span>
                </Link>
                <Link
                  href="/"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2.5 p-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <LogOut size={14} />
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
