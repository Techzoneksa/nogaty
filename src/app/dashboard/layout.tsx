"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { BottomNav } from "@/components/BottomNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentBusiness, setCurrentBusiness] = useState("cafe_noqta");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const businessNames = {
    cafe_noqta: "كافيه نقطة",
    restaurant_mazaq: "مطعم مذاق",
    supermarket_hay: "سوبرماركت الحي",
  };

  const handleBusinessChange = (businessId: string) => {
    setCurrentBusiness(businessId);
    // You could save to localStorage or state here for multi-tenant simulation
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("businessChanged", { detail: businessId })
      );
    }
  };

  return (
    <div className="min-h-screen bg-bg-base flex font-sans">
      {/* Sidebar - Desktop Only */}
      <Sidebar
        currentBusiness={currentBusiness}
        onBusinessChange={handleBusinessChange}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0 min-h-screen">
        {/* Topbar */}
        <Topbar
          businessName={businessNames[currentBusiness as keyof typeof businessNames]}
          onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          {children}
        </main>

        {/* Bottom Nav - Mobile Only */}
        <BottomNav />
      </div>
    </div>
  );
}
