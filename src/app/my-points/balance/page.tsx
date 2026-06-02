"use client";

import Link from "next/link";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import BottomNav from "@/components/my-points/BottomNav";

export default function BalancePage() {
  return (
    <div className="min-h-screen bg-bg-base pb-20">
      <div className="bg-gradient-to-br from-primary via-primary-light to-secondary px-6 pt-12 pb-20 rounded-b-3xl">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/my-points/home">
            <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
          </Link>
          <h1 className="text-xl font-bold text-white">رصيد النقاط</h1>
        </div>

        <div className="flex flex-col items-center">
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl w-full">
            <div className="flex flex-col items-center gap-2 py-6">
              <p className="text-text-secondary text-sm">رصيدك الحالي</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-primary">2,450</span>
                <span className="text-text-primary font-bold">نقطة</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="px-6 -mt-10">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-white border-0 shadow-md">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-success"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <p className="text-text-secondary text-xs">إجمالي مكتسب</p>
              <p className="text-xl font-black text-success">15,800</p>
            </div>
          </Card>
          <Card className="bg-white border-0 shadow-md">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-danger/10 rounded-full flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-danger"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 12H4" />
                </svg>
              </div>
              <p className="text-text-secondary text-xs">إجمالي مستبدل</p>
              <p className="text-xl font-black text-danger">13,350</p>
            </div>
          </Card>
        </div>

        <Card className="bg-white border-0 shadow-md mb-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-xl">
              <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-accent"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 8v13m0-13V6a2 2 0 112 2h-2a2 2 0 112 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2a2 2 0 012-2z" />
                </svg>
              </div>
              <div>
                <p className="text-text-primary font-bold text-sm">
                  كل 10 نقاط = 1 ريال خصم
                </p>
                <p className="text-text-secondary text-xs">
                  يمكنك استبدال نقاطك بدءاً من 100 نقطة
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-secondary to-secondary-dark border-0 shadow-md mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-white"
                fill="currentColor"
              >
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
            <p className="text-white font-medium text-sm">
              كل نقطة تخلصها تقربك من مكافأة أكبر!
            </p>
          </div>
        </Card>

        <Link href="/my-points/history">
          <Button variant="primary" size="lg" className="w-full">
            عرض سجل النقاط
          </Button>
        </Link>
      </div>

      <BottomNav />
    </div>
  );
}
