import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { getTenantIdForUser, getCustomerById, getCustomersByTenant } from "@/lib/demo/merchant-data";
import { UserRole } from "@prisma/client";

export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const { phone, membershipId, amount, points, note, branchId } = body;

    if (!amount && !points) {
      return NextResponse.json({ error: "مبلغ الشراء أو النقاط مطلوب" }, { status: 400 });
    }

    let customer = null;
    if (phone || membershipId) {
      const customers = getCustomersByTenant(tenantId);
      customer = customers.find((c) => {
        if (phone && c.phone.replace("+966", "0").replace("+", "") === phone.replace("+966", "0").replace("+", "")) return true;
        if (membershipId && c.id === membershipId) return true;
        return false;
      });
    }

    if (!customer) {
      return NextResponse.json({ error: "العميل غير موجود" }, { status: 404 });
    }

    const calculatedPoints = points || Math.floor((amount || 0) * 1);

    const transaction = {
      id: `tx-${Date.now()}`,
      tenantId,
      customerId: customer.id,
      branchId: branchId || "branch-2-1",
      type: "EARN" as const,
      points: calculatedPoints,
      amount: amount || undefined,
      description: note || "عملية شراء",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      message: "تم إضافة النقاط بنجاح",
      transaction,
      customer: {
        ...customer,
        totalPoints: customer.totalPoints + calculatedPoints,
      },
    }, { status: 201 });

  } catch (error) {
    console.error("Add points error:", error);
    return NextResponse.json({ error: "خطأ داخلي" }, { status: 500 });
  }
}