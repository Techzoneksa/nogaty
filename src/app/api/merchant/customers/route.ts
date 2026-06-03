import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { getTenantIdForUser, getCustomersByTenant, getCustomerById } from "@/lib/demo/merchant-data";
import { isDemoMode } from "@/lib/data/data-source";
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

    // Get query params
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    let customers = getCustomersByTenant(tenantId);

    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase();
      customers = customers.filter(
        (c) =>
          c.name.toLowerCase().includes(searchLower) ||
          c.phone.includes(search)
      );
    }

    // Filter by status
    if (status) {
      customers = customers.filter((c) => c.status === status);
    }

    // Pagination
    const total = customers.length;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    const paginatedCustomers = customers.slice(offset, offset + limit);

    return NextResponse.json({
      customers: paginatedCustomers,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
      summary: {
        total,
        active: customers.filter((c) => c.status === "ACTIVE").length,
        inactive: customers.filter((c) => c.status === "INACTIVE").length,
      },
    });

  } catch (error) {
    console.error("Customers API error:", error);
    return NextResponse.json({ error: "خطأ داخلي" }, { status: 500 });
  }
}

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
    const { name, phone, email } = body;

    // Validation
    if (!name || !name.trim()) {
      return NextResponse.json({ error: "الاسم مطلوب" }, { status: 400 });
    }

    if (!phone || !phone.trim()) {
      return NextResponse.json({ error: "رقم الجوال مطلوب" }, { status: 400 });
    }

    // Check for duplicate phone within tenant
    const existingCustomers = getCustomersByTenant(tenantId);
    const phoneExists = existingCustomers.some(
      (c) => c.phone.replace("+966", "0") === phone.replace("+966", "0")
    );

    if (phoneExists) {
      return NextResponse.json({ error: "رقم الجوال مسجل مسبقاً" }, { status: 400 });
    }

    // In demo mode, simulate creation
    const newCustomer = {
      id: `cust-demo-${Date.now()}`,
      tenantId,
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim() || undefined,
      totalPoints: 0,
      totalVisits: 0,
      lastVisitAt: new Date().toISOString(),
      status: "ACTIVE" as const,
      tier: "Bronze" as const,
    };

    return NextResponse.json(
      { message: "تم إنشاء العميل", customer: newCustomer },
      { status: 201 }
    );

  } catch (error) {
    console.error("Create customer error:", error);
    return NextResponse.json({ error: "خطأ داخلي" }, { status: 500 });
  }
}