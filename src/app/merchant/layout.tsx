"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import LanguageToggle from "@/components/LanguageToggle";
import { MerchantBottomNav } from "@/components/merchant/BottomNav";

export default function MerchantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const menuItems = [
    { label: "الرئيسية", path: "/merchant" },
    { label: "العملاء", path: "/merchant/customers" },
    { label: "النقاط", path: "/merchant/points" },
    { label: "استبدال", path: "/merchant/redeem" },
    { label: "السجل", path: "/merchant/history" },
    { label: "العروض", path: "/merchant/offers" },
    { label: "البنرات", path: "/merchant/banners" },
    { label: "المنتجات", path: "/merchant/news" },
    { label: "الإعدادات", path: "/merchant/settings" },
    { label: "المستخدمين", path: "/merchant/users" },
    { label: "القواعد", path: "/merchant/rules" },
  ];

  return (
    <div className="min-h-screen bg-bg-base flex font-sans">
      <aside className="w-64 bg-card-base border-r border-border-base h-screen sticky top-0 flex flex-col justify-between shrink-0 hidden lg:flex select-none">
        <div className="flex flex-col flex-1 min-h-0">
          <div className="p-5 border-b border-border-base flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xl font-black text-primary tracking-tight">nogaty</span>
              <span className="text-[10px] text-text-secondary font-bold">
                بواسطة Jad Cloud
              </span>
            </div>
          </div>

          <div className="p-4 border-b border-border-base">
            <button className="w-full flex items-center justify-between p-2.5 rounded-xl border border-border-base bg-bg-base/50 hover:bg-bg-base transition-colors text-right cursor-pointer">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-text-primary">
                    كافيه نقطة
                  </span>
                  <span className="text-[10px] text-text-secondary">
                    كافيه
                  </span>
                </div>
              </div>
              <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.path || (item.path !== "/merchant" && pathname.startsWith(item.path));
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
                  <span className={isActive ? "text-white" : "text-text-secondary"}>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-border-base bg-bg-base/30 flex items-center justify-between">
          <LanguageToggle />
          <Link
            href="/"
            onClick={async (e) => {
              e.preventDefault();
              setIsLoggingOut(true);
              try {
                await fetch("/api/auth/logout", { method: "POST" });
                router.push("/auth/login");
                router.refresh();
              } catch {
                setIsLoggingOut(false);
              }
            }}
            className="text-[10px] text-primary hover:underline font-bold cursor-pointer disabled:opacity-50"
          >
            {isLoggingOut ? "جاري..." : "خروج"}
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0 min-h-screen">
        <header className="h-16 bg-white border-b border-border-base flex items-center justify-between px-4 lg:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <div className="lg:hidden w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-text-primary">كافيه نقطة</span>
              <span className="text-[10px] text-text-secondary hidden sm:block">لوحة تحكم التاجر</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-text-primary cursor-pointer">
              م
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          {children}
        </main>

        <MerchantBottomNav />
      </div>
    </div>
  );
}