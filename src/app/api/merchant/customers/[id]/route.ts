import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { getTenantIdForUser, getCustomerById, getTransactionsByCustomer, getRewardsByTenant } from "@/lib/demo/merchant-data";
import { UserRole } from "@prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;

    // Get customer - must belong to same tenant
    const customer = getCustomerById(id, tenantId);
    
    if (!customer) {
      return NextResponse.json({ error: "العميل غير موجود" }, { status: 404 });
    }

    // Get customer transactions
    const transactions = getTransactionsByCustomer(id, tenantId);
    
    // Get tenant rewards
    const rewards = getRewardsByTenant(tenantId);

    // Calculate balance from transactions
    const balance = transactions.reduce((sum, t) => sum + t.points, 0);

    // Recent redemptions
    const redemptions = transactions
      .filter((t) => t.type === "REDEEM")
      .map((t) => ({
        id: t.id,
        rewardName: "مكافأة",
        pointsUsed: Math.abs(t.points),
        redeemedAt: t.createdAt,
      }));

    return NextResponse.json({
      customer,
      balance,
      totalVisits: customer.totalVisits,
      lastVisitAt: customer.lastVisitAt,
      transactions: transactions.slice(0, 20),
      redemptions,
      campaigns: [],
      notes: [],
      rewards,
    });

  } catch (error) {
    console.error("Customer detail API error:", error);
    return NextResponse.json({ error: "خطأ داخلي" }, { status: 500 });
  }
}