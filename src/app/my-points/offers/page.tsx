"use client";

import Link from "next/link";
import { Card } from "@/components/Card";
import BottomNav from "@/components/my-points/BottomNav";

export default function OffersPage() {
  const offers = [
    {
      id: 1,
      title: "عرض النقاط الثلاثية",
      description: "اجمع 3 أضعاف النقاط على جميع المشتربات",
      expiryDate: "2024-03-31",
    },
    {
      id: 2,
      title: "عروض رمضان",
      description: "خصم 20% على جميع المنتجات",
      expiryDate: "2024-04-15",
    },
  ];

  return (
    <div className="min-h-screen bg-bg-base pb-20">
      <div className="bg-gradient-to-br from-primary via-primary-light to-secondary px-6 pt-12 pb-6 rounded-b-3xl">
        <div className="flex items-center gap-4">
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
          <h1 className="text-xl font-bold text-white">العروض</h1>
        </div>
      </div>

      <div className="px-6 py-6">
        {offers.length === 0 ? (
          <Card className="bg-white border-0 shadow-md">
            <div className="flex flex-col items-center gap-4 py-12">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-accent"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 8v13m0-13V6a2 2 0 112 2h-2a2 2 0 112 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2a2 2 0 012-2z" />
                </svg>
              </div>
              <p className="text-text-secondary font-medium">
                لا توجد عروض حالية
              </p>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {offers.map((offer) => (
              <Card key={offer.id} hoverEffect className="bg-white border-0 shadow-md p-0 overflow-hidden">
                <div className="bg-gradient-to-br from-accent/20 to-accent/10 h-24 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-10 h-10 text-accent"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M12 8v13m0-13V6a2 2 0 112 2h-2a2 2 0 112 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2a2 2 0 012-2z" />
                  </svg>
                </div>
                <div className="p-3">
                  <h3 className="text-text-primary font-bold text-sm mb-1">
                    {offer.title}
                  </h3>
                  <p className="text-text-secondary text-xs mb-2 line-clamp-2">
                    {offer.description}
                  </p>
                  <p className="text-accent text-xs font-medium">
                    ينتهي: {offer.expiryDate}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="px-6 py-4 border-t border-border-base bg-white">
        <p className="text-text-secondary text-xs text-center">
          اسحب للأسفل للتحديث
        </p>
      </div>

      <BottomNav />
    </div>
  );
}
