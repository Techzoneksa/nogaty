import { NextRequest, NextResponse } from "next/server";
import { getTransactionsByCustomer } from "@/lib/demo/merchant-data";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const memberId = searchParams.get("memberId");
    const tenantId = searchParams.get("tenantId");

    if (!memberId || !tenantId) {
      return NextResponse.json({ error: "معرف العضوية ومعرف التاجر مطلوبان" }, { status: 400 });
    }

    const transactions = getTransactionsByCustomer(memberId, tenantId);

    const formattedTransactions = transactions.map((t) => ({
      id: t.id,
      type: t.type,
      points: t.points,
      amount: t.amount,
      description: t.description,
      createdAt: t.createdAt,
    }));

    return NextResponse.json({
      transactions: formattedTransactions,
      total: transactions.length,
    });

  } catch (error) {
    console.error("Customer history error:", error);
    return NextResponse.json({ error: "خطأ داخلي" }, { status: 500 });
  }
}