import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { getTenantIdForUser, getCustomerById, getCustomersByTenant, getRewardsByTenant } from "@/lib/demo/merchant-data";
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
    const { phone, membershipId, points, rewardId, branchId } = body;

    if (!points && !rewardId) {
      return NextResponse.json({ error: "النقاط أو المكافأة مطلوبة" }, { status: 400 });
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

    let pointsToRedeem = points || 0;
    let reward = null;
    let discountValue = 0;

    if (rewardId) {
      const rewards = getRewardsByTenant(tenantId);
      reward = rewards.find((r) => r.id === rewardId);
      if (!reward) {
        return NextResponse.json({ error: "المكافأة غير موجودة" }, { status: 404 });
      }
      pointsToRedeem = reward.pointsCost;
      discountValue = reward.value;
    }

    if (customer.totalPoints < pointsToRedeem) {
      return NextResponse.json({ error: "رصيد العميل غير كافٍ" }, { status: 400 });
    }

    const transaction = {
      id: `tx-${Date.now()}`,
      tenantId,
      customerId: customer.id,
      branchId: branchId || "branch-2-1",
      type: "REDEEM" as const,
      points: -pointsToRedeem,
      amount: discountValue || undefined,
      description: reward ? `استبدال: ${reward.name}` : "استبدال نقاط",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      message: "تم استبدال النقاط بنجاح",
      transaction,
      customer: {
        ...customer,
        totalPoints: customer.totalPoints - pointsToRedeem,
      },
      reward: reward ? { name: reward.name, value: discountValue } : null,
    }, { status: 201 });

  } catch (error) {
    console.error("Redeem points error:", error);
    return NextResponse.json({ error: "خطأ داخلي" }, { status: 500 });
  }
}