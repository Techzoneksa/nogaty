import { NextRequest, NextResponse } from "next/server";
import { getCustomerById, DEMO_CUSTOMERS, getTransactionsByCustomer } from "@/lib/demo/merchant-data";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const memberId = searchParams.get("memberId");
    const tenantId = searchParams.get("tenantId");

    if (!memberId || !tenantId) {
      return NextResponse.json({ error: "معرف العضوية ومعرف التاجر مطلوبان" }, { status: 400 });
    }

    const customer = getCustomerById(memberId, tenantId);
    if (!customer) {
      return NextResponse.json({ error: "العميل غير موجود" }, { status: 404 });
    }

    const transactions = getTransactionsByCustomer(memberId, tenantId);

    return NextResponse.json({
      customer: {
        id: customer.id,
        name: customer.name,
        phone: customer.phone,
        totalPoints: customer.totalPoints,
        tier: customer.tier,
        status: customer.status,
        totalVisits: customer.totalVisits,
        lastVisitAt: customer.lastVisitAt,
      },
      recentTransactions: transactions.slice(0, 5),
    });

  } catch (error) {
    console.error("Customer balance error:", error);
    return NextResponse.json({ error: "خطأ داخلي" }, { status: 500 });
  }
}