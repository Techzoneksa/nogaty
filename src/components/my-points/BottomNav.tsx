"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "الرئيسية",
    path: "/my-points/home",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-6 h-6"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <path d="M9 22V12h6v10" />
      </svg>
    ),
  },
  {
    label: "النقاط",
    path: "/my-points/balance",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
    ),
  },
  {
    label: "العروض",
    path: "/my-points/offers",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-6 h-6"
      >
        <path d="M20 12v10H4V12M22 7H2v5h20V7z" />
        <path d="M12 22V7M12 7H7.5a2.5 2.5 0 110-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 100-5C13 破2 12 7 12 7z" />
      </svg>
    ),
  },
  {
    label: "حسابي",
    path: "/my-points/profile",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-6 h-6"
      >
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-border-base flex items-center justify-around px-2 z-50 shadow-lg">
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        return (
          <Link
            key={item.path}
            href={item.path}
            className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-colors ${
              isActive ? "text-primary" : "text-text-secondary"
            }`}
          >
            <div className={isActive ? "stroke-[2.5px]" : "stroke-[2px]"}>
              {item.icon}
            </div>
            <span className="text-[10px] font-bold">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
