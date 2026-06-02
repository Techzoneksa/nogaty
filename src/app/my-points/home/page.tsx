"use client";

import Link from "next/link";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import BottomNav from "@/components/my-points/BottomNav";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg-base pb-20">
      <div className="bg-gradient-to-br from-primary via-primary-light to-secondary px-6 pt-12 pb-24 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-primary"
                fill="currentColor"
              >
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
            <div className="text-white">
              <p className="text-white/80 text-sm">أهلاً بعودتك</p>
              <h1 className="text-xl font-bold">يا أحمد</h1>
            </div>
          </div>
          <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 01-3.46 0" />
            </svg>
          </button>
        </div>

        <Link href="/my-points/barcode">
          <Card hoverEffect className="bg-white border-0 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center">
                <span className="text-3xl font-black text-accent">2450</span>
              </div>
              <div className="flex-1">
                <p className="text-text-secondary text-sm">رصيد نقاطك الحالي</p>
                <p className="text-text-primary font-bold">نقطة</p>
              </div>
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>
          </Card>
        </Link>
      </div>

      <div className="px-6 -mt-16">
        <div className="flex gap-3 mb-6">
          <Link href="/my-points/barcode" className="flex-1">
            <Card hoverEffect className="bg-white border-0 shadow-md h-full">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 text-secondary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-text-primary">الباركود</span>
              </div>
            </Card>
          </Link>
          <Link href="/my-points/history" className="flex-1">
            <Card hoverEffect className="bg-white border-0 shadow-md h-full">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 8v4l3 3" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-text-primary">سجل النقاط</span>
              </div>
            </Card>
          </Link>
          <Link href="/my-points/offers" className="flex-1">
            <Card hoverEffect className="bg-white border-0 shadow-md h-full">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 text-accent"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 8v13m0-13V6a2 2 0 112 2h-2a2 2 0 112 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2a2 2 0 012-2z" />
                    <path d="M2 12h20" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-text-primary">العروض</span>
              </div>
            </Card>
          </Link>
        </div>

        <Link href="/my-points/news">
          <Card hoverEffect className="bg-white border-0 shadow-md mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-7 h-7 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-text-primary font-bold">المنتجات الجديدة</p>
                <p className="text-text-secondary text-sm">اكتشف آخر الإصدارات</p>
              </div>
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-text-secondary"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </div>
          </Card>
        </Link>

        <Card hoverEffect className="bg-gradient-to-r from-primary to-primary-dark border-0 shadow-md">
          <Link href="/my-points/merchant-info">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-7 h-7 text-primary"
                  fill="currentColor"
                >
                  <path d="M12 2L15.09 A8.26 8.26 0 0122 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26Z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-white font-bold">متجر النموذج</p>
                <p className="text-white/80 text-sm">عرض معلومات المتجر</p>
              </div>
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-white/80"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </div>
          </Link>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}
