import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { DataStore } from "@/lib/dataStore";

export async function GET(req: NextRequest) {
  const { errorResponse } = await requireAuth(req);
  if (errorResponse) return errorResponse;

  const searchParams = req.nextUrl.searchParams;
  const period = (searchParams.get("period") || "30d") as "7d" | "30d" | "3m" | "12m";

  const stats = DataStore.getDashboardStats(period);
  return NextResponse.json({ success: true, data: stats });
}
