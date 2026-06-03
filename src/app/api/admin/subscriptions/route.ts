import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { UserRole } from "@prisma/client";

interface Subscription {
  id: string;
  merchantId: string;
  merchant: string;
  package: string;
  startDate: string;
  endDate: string;
  status: "active" | "trial" | "expired" | "cancelled";
  amount: number;
}

const DEMO_SUBSCRIPTIONS: Subscription[] = [
  { id: "sub-1", merchantId: "m1", merchant: "مقهى النخبة", package: "احترافية", startDate: "2024-01-15", endDate: "2025-01-15", status: "active", amount: 249 },
  { id: "sub-2", merchantId: "m2", merchant: "سوبرماركت الشاطئ", package: "أساسية", startDate: "2024-02-20", endDate: "2025-02-20", status: "active", amount: 99 },
  { id: "sub-3", merchantId: "m3", merchant: "صالون الأناقة", package: "متقدمة", startDate: "2024-03-10", endDate: "2025-03-10", status: "trial", amount: 499 },
  { id: "sub-4", merchantId: "m4", merchant: "متجر التقنية", package: "احترافية", startDate: "2023-11-05", endDate: "2024-11-05", status: "expired", amount: 249 },
  { id: "sub-5", merchantId: "m5", merchant: "مطعم Heritage", package: "متقدمة", startDate: "2023-12-01", endDate: "2024-12-01", status: "cancelled", amount: 499 },
];

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json({ error: "غير مسجل" }, { status: 401 });
    }

    if (session.role !== UserRole.SUPER_ADMIN) {
      return NextResponse.json({ error: "غير مصرح" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "";

    let subscriptions = [...DEMO_SUBSCRIPTIONS];

    if (status) {
      subscriptions = subscriptions.filter((s) => s.status === status);
    }

    return NextResponse.json({
      subscriptions,
      summary: {
        total: subscriptions.length,
        active: subscriptions.filter((s) => s.status === "active").length,
        trial: subscriptions.filter((s) => s.status === "trial").length,
        expired: subscriptions.filter((s) => s.status === "expired").length,
        cancelled: subscriptions.filter((s) => s.status === "cancelled").length,
      },
    });

  } catch (error) {
    console.error("Admin subscriptions error:", error);
    return NextResponse.json({ error: "خطأ داخلي" }, { status: 500 });
  }
}