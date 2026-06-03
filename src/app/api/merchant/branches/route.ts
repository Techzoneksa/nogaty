import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { getTenantIdForUser, getBranchesByTenant } from "@/lib/demo/merchant-data";
import { UserRole } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json({ error: "غير مسجل" }, { status: 401 });
    }

    if (session.role !== UserRole.MERCHANT_OWNER && session.role !== UserRole.MERCHANT_STAFF) {
      return NextResponse.json({ error: "غير مصرح" }, { status: 403 });
    }

    const tenantId = getTenantIdForUser(session.email);
    if (!tenantId) {
      return NextResponse.json({ error: "لا توجد منشأة" }, { status: 404 });
    }

    const branches = getBranchesByTenant(tenantId);

    return NextResponse.json({
      branches,
      total: branches.length,
    });

  } catch (error) {
    console.error("Branches API error:", error);
    return NextResponse.json({ error: "خطأ داخلي" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json({ error: "غير مسجل" }, { status: 401 });
    }

    if (session.role !== UserRole.MERCHANT_OWNER) {
      return NextResponse.json({ error: "غير مصرح" }, { status: 403 });
    }

    const tenantId = getTenantIdForUser(session.email);
    if (!tenantId) {
      return NextResponse.json({ error: "لا توجد منشأة" }, { status: 404 });
    }

    const body = await request.json();
    const { name, city, district, address } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ error: "اسم الفرع مطلوب" }, { status: 400 });
    }

    const newBranch = {
      id: `branch-${Date.now()}`,
      tenantId,
      name: name.trim(),
      city: city?.trim() || "",
      district: district?.trim() || "",
    };

    return NextResponse.json(
      { message: "تم إضافة الفرع", branch: newBranch },
      { status: 201 }
    );

  } catch (error) {
    console.error("Create branch error:", error);
    return NextResponse.json({ error: "خطأ داخلي" }, { status: 500 });
  }
}