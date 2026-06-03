import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { UserRole } from "@prisma/client";

interface Package {
  id: string;
  name: string;
  price: number;
  customerLimit: number;
  branchesLimit: number;
  features: string[];
  active: boolean;
}

const DEMO_PACKAGES: Package[] = [
  { id: "pkg-1", name: "أساسية", price: 99, customerLimit: 100, branchesLimit: 1, features: ["برنامج نقاط الولاء", "تقرير أساسي", "دعم عبر البريد"], active: true },
  { id: "pkg-2", name: "احترافية", price: 249, customerLimit: 500, branchesLimit: 3, features: ["كل مميزات الأساسية", "تقرير متقدم", "دعم عبر الهاتف", "API مخصص"], active: true },
  { id: "pkg-3", name: "متقدمة", price: 499, customerLimit: 1000, branchesLimit: 10, features: ["كل مميزات الاحترافية", "تقرير شامل", "دعم 24/7", "تكامل غير محدود", "أولوية الإطلاق"], active: true },
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

    return NextResponse.json({
      packages: DEMO_PACKAGES,
      total: DEMO_PACKAGES.length,
    });

  } catch (error) {
    console.error("Admin packages error:", error);
    return NextResponse.json({ error: "خطأ داخلي" }, { status: 500 });
  }
}