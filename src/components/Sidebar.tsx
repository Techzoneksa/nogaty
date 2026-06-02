"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Coins,
  Gift,
  Megaphone,
  MapPin,
  BarChart3,
  CreditCard,
  Layers,
  Wallet,
  Settings,
  ChevronDown,
  Store,
} from "lucide-react";

interface SidebarProps {
  currentBusiness?: string;
  onBusinessChange?: (business: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentBusiness = "cafe_noqta",
  onBusinessChange,
}) => {
  const pathname = usePathname();

  const menuItems = [
    { label: "الرئيسية", path: "/dashboard", icon: Home },
    { label: "العملاء", path: "/dashboard/customers", icon: Users },
    { label: "نظام النقاط", path: "/dashboard/points", icon: Coins },
    { label: "المكافآت", path: "/dashboard/rewards", icon: Gift },
    { label: "الحملات", path: "/dashboard/campaigns", icon: Megaphone },
    { label: "الفروع", path: "/dashboard/branches", icon: MapPin },
    { label: "التقارير", path: "/dashboard/reports", icon: BarChart3 },
    { label: "صفحة العميل", path: "/dashboard/customer-page", icon: CreditCard },
    { label: "التكاملات", path: "/dashboard/integrations", icon: Layers },
    { label: "الاشتراك والخطط", path: "/dashboard/billing", icon: Wallet },
    { label: "الإعدادات", path: "/dashboard/settings", icon: Settings },
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
                <Store size={16} />
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
            <ChevronDown size={14} className="text-text-secondary" />
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
            const Icon = item.icon;
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
                <Icon size={16} className={isActive ? "text-white" : "text-text-secondary"} />
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
