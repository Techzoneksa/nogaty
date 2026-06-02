"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Coins,
  Gift,
  MoreHorizontal,
  Megaphone,
  MapPin,
  BarChart3,
  CreditCard,
  Layers,
  Wallet,
  Settings,
  X,
  LogOut,
} from "lucide-react";

export const BottomNav: React.FC = () => {
  const pathname = usePathname();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const mainNav = [
    { label: "الرئيسية", path: "/dashboard", icon: Home },
    { label: "العملاء", path: "/dashboard/customers", icon: Users },
    { label: "النقاط", path: "/dashboard/points", icon: Coins },
    { label: "المكافآت", path: "/dashboard/rewards", icon: Gift },
  ];

  const secondaryNav = [
    { label: "الحملات التسويقية", path: "/dashboard/campaigns", icon: Megaphone },
    { label: "الفروع والمواقع", path: "/dashboard/branches", icon: MapPin },
    { label: "التقارير والأداء", path: "/dashboard/reports", icon: BarChart3 },
    { label: "صفحة العميل (Loyalty Card)", path: "/dashboard/customer-page", icon: CreditCard },
    { label: "التكاملات والربط", path: "/dashboard/integrations", icon: Layers },
    { label: "الاشتراك والخطط", path: "/dashboard/billing", icon: Wallet },
    { label: "الإعدادات العامة", path: "/dashboard/settings", icon: Settings },
  ];

  return (
    <>
      {/* Bottom Nav Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-border-base flex items-center justify-around px-2 z-30 shadow-lg select-none">
        {mainNav.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center justify-center gap-1 w-16 h-full transition-colors cursor-pointer ${
                isActive ? "text-primary" : "text-text-secondary"
              }`}
            >
              <Icon size={20} className={isActive ? "stroke-[2.5px]" : "stroke-[2px]"} />
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
          <MoreHorizontal size={20} />
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
                <X size={16} />
              </button>
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-2 gap-2 my-2">
              {secondaryNav.map((item) => {
                const isActive = pathname === item.path;
                const Icon = item.icon;
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
                    <Icon size={16} className={isActive ? "text-primary" : "text-text-secondary"} />
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
              <LogOut size={16} />
              <span>تسجيل الخروج</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
