import { NextRequest, NextResponse } from "next/server";
import { DEMO_TENANTS, getTenantIdBySlug } from "@/lib/demo/merchant-data";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantSlug = searchParams.get("merchant");

    if (!merchantSlug) {
      return NextResponse.json({ error: "معرف التاجر مطلوب" }, { status: 400 });
    }

    const tenantId = getTenantIdBySlug(merchantSlug);
    if (!tenantId) {
      return NextResponse.json({ error: "التاجر غير موجود" }, { status: 404 });
    }

    const tenant = DEMO_TENANTS[tenantId];
    if (!tenant) {
      return NextResponse.json({ error: "التاجر غير موجود" }, { status: 404 });
    }

    return NextResponse.json({
      merchant: {
        id: tenant.id,
        name: tenant.name,
        slug: tenant.slug,
        businessType: tenant.businessType,
        primaryColor: tenant.primaryColor,
        secondaryColor: tenant.secondaryColor,
      },
    });

  } catch (error) {
    console.error("Merchant info error:", error);
    return NextResponse.json({ error: "خطأ داخلي" }, { status: 500 });
  }
}