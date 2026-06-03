import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { UserRole } from "@prisma/client";

interface MerchantDetail {
  id: string;
  name: string;
  type: string;
  city: string;
  district: string;
  owner: {
    name: string;
    phone: string;
    email: string;
  };
  package: string;
  packagePrice: number;
  status: "active" | "trial" | "suspended" | "expired";
  joinDate: string;
  subscriptionStart: string;
  subscriptionEnd: string;
  stats: {
    customers: number;
    pointsIssued: number;
    pointsRedeemed: number;
  };
  branches: string[];
}

const DEMO_MERCHANT_DETAILS: Record<string, MerchantDetail> = {
  "m1": { id: "m1", name: "مقهى النخبة", type: "مطعم", city: "الرياض", district: "حي العليا", owner: { name: "خالد العتيبي", phone: "0501234567", email: "khaled@example.com" }, package: "احترافية", packagePrice: 249, status: "active", joinDate: "2024-01-15", subscriptionStart: "2024-01-15", subscriptionEnd: "2025-01-15", stats: { customers: 245, pointsIssued: 15000, pointsRedeemed: 8500 }, branches: ["الرياض - حي العليا", "الرياض - حي الملقا"] },
  "m2": { id: "m2", name: "سوبرماركت الشاطئ", type: "متجر", city: "جدة", district: "حي الشاطئ", owner: { name: "محمد الأحمد", phone: "0509876543", email: "mohammed@example.com" }, package: "أساسية", packagePrice: 99, status: "active", joinDate: "2024-02-20", subscriptionStart: "2024-02-20", subscriptionEnd: "2025-02-20", stats: { customers: 180, pointsIssued: 12000, pointsRedeemed: 7000 }, branches: ["جدة - حي الشاطئ"] },
  "m3": { id: "m3", name: "صالون الأناقة", type: "جمال", city: "الدمام", district: "حي العليا", owner: { name: "سارة القحطاني", phone: "0553456789", email: "sara@example.com" }, package: "متقدمة", packagePrice: 499, status: "trial", joinDate: "2024-03-10", subscriptionStart: "2024-03-10", subscriptionEnd: "2025-03-10", stats: { customers: 85, pointsIssued: 4200, pointsRedeemed: 1500 }, branches: ["الدمام - حي العليا"] },
  "m4": { id: "m4", name: "متجر التقنية", type: "إلكترونيات", city: "الرياض", district: "حي العليا", owner: { name: "عبدالله السعيد", phone: "0502345678", email: "abdullah@example.com" }, package: "احترافية", packagePrice: 249, status: "active", joinDate: "2023-11-05", subscriptionStart: "2023-11-05", subscriptionEnd: "2024-11-05", stats: { customers: 320, pointsIssued: 22000, pointsRedeemed: 14000 }, branches: ["الرياض - حي العليا", "الرياض - حي التخصصي"] },
  "m5": { id: "m5", name: "مطعم Heritage", type: "مطعم", city: "الرياض", district: "حي العليا", owner: { name: "ناصر العنزي", phone: "0508765432", email: "nasser@example.com" }, package: "متقدمة", packagePrice: 499, status: "suspended", joinDate: "2023-12-01", subscriptionStart: "2023-12-01", subscriptionEnd: "2024-12-01", stats: { customers: 95, pointsIssued: 6500, pointsRedeemed: 3200 }, branches: ["الرياض - حي العليا"] },
  "m6": { id: "m6", name: "مخبز النجاح", type: "مطعم", city: "مكة", district: "حي العزيزية", owner: { name: "أحمد الزهراني", phone: "0504567890", email: "ahmed@example.com" }, package: "أساسية", packagePrice: 99, status: "expired", joinDate: "2023-06-15", subscriptionStart: "2023-06-15", subscriptionEnd: "2024-06-15", stats: { customers: 45, pointsIssued: 2800, pointsRedeemed: 1200 }, branches: ["مكة - حي العزيزية"] },
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: "غير مسجل" }, { status: 401 });
    }

    if (session.role !== UserRole.SUPER_ADMIN) {
      return NextResponse.json({ error: "غير مصرح" }, { status: 403 });
    }

    const { id } = await params;
    const merchant = DEMO_MERCHANT_DETAILS[id];

    if (!merchant) {
      return NextResponse.json({ error: "التاجر غير موجود" }, { status: 404 });
    }

    return NextResponse.json({ merchant });

  } catch (error) {
    console.error("Admin merchant detail error:", error);
    return NextResponse.json({ error: "خطأ داخلي" }, { status: 500 });
  }
}