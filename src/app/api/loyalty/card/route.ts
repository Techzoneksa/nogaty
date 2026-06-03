import { NextRequest, NextResponse } from "next/server";
import { getCustomerById, DEMO_TENANTS } from "@/lib/demo/merchant-data";

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

    const tenant = DEMO_TENANTS[tenantId];
    if (!tenant) {
      return NextResponse.json({ error: "التاجر غير موجود" }, { status: 404 });
    }

    return NextResponse.json({
      card: {
        memberId: customer.id,
        memberName: customer.name,
        phone: customer.phone,
        points: customer.totalPoints,
        tier: customer.tier,
        merchantName: tenant.name,
        merchantSlug: tenant.slug,
        primaryColor: tenant.primaryColor,
        secondaryColor: tenant.secondaryColor,
        valid: customer.status === "ACTIVE",
      },
    });

  } catch (error) {
    console.error("Loyalty card error:", error);
    return NextResponse.json({ error: "خطأ داخلي" }, { status: 500 });
  }
}