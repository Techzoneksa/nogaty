import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { UserRole } from "@prisma/client";

interface Merchant {
  id: string;
  name: string;
  type: string;
  city: string;
  owner: string;
  phone: string;
  package: string;
  status: "active" | "trial" | "suspended" | "expired";
  customers: number;
  joinDate: string;
}

const DEMO_MERCHANTS: Merchant[] = [
  { id: "m1", name: "مقهى النخبة", type: "مطعم", city: "الرياض", owner: "خالد العتيبي", phone: "0501234567", package: "احترافية", status: "active", customers: 245, joinDate: "2024-01-15" },
  { id: "m2", name: "سوبرماركت الشاطئ", type: "متجر", city: "جدة", owner: "محمد الأحمد", phone: "0509876543", package: "أساسية", status: "active", customers: 180, joinDate: "2024-02-20" },
  { id: "m3", name: "صالون الأناقة", type: "جمال", city: "الدمام", owner: "سارة القحطاني", phone: "0553456789", package: "متقدمة", status: "trial", customers: 85, joinDate: "2024-03-10" },
  { id: "m4", name: "متجر التقنية", type: "إلكترونيات", city: "الرياض", owner: "عبدالله السعيد", phone: "0502345678", package: "احترافية", status: "active", customers: 320, joinDate: "2023-11-05" },
  { id: "m5", name: "مطعم Heritage", type: "مطعم", city: "الرياض", owner: "ناصر العنزي", phone: "0508765432", package: "متقدمة", status: "suspended", customers: 95, joinDate: "2023-12-01" },
  { id: "m6", name: "مخبز النجاح", type: "مطعم", city: "مكة", owner: "أحمد الزهراني", phone: "0504567890", package: "أساسية", status: "expired", customers: 45, joinDate: "2023-06-15" },
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
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    let merchants = [...DEMO_MERCHANTS];

    if (search) {
      merchants = merchants.filter(
        (m) => m.name.includes(search) || m.phone.includes(search) || m.owner.includes(search)
      );
    }

    if (status) {
      merchants = merchants.filter((m) => m.status === status);
    }

    const total = merchants.length;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    const paginatedMerchants = merchants.slice(offset, offset + limit);

    return NextResponse.json({
      merchants: paginatedMerchants,
      pagination: { page, limit, total, totalPages },
      summary: {
        total: merchants.length,
        active: merchants.filter((m) => m.status === "active").length,
        trial: merchants.filter((m) => m.status === "trial").length,
        suspended: merchants.filter((m) => m.status === "suspended").length,
        expired: merchants.filter((m) => m.status === "expired").length,
      },
    });

  } catch (error) {
    console.error("Admin merchants error:", error);
    return NextResponse.json({ error: "خطأ داخلي" }, { status: 500 });
  }
}