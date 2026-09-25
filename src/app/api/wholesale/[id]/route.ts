import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { DataStore } from "@/lib/dataStore";

export async function PUT(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const { errorResponse } = await requireAuth(req);
  if (errorResponse) return errorResponse;

  try {
    const body = await req.json();
    const updated = DataStore.updateWholesale(params.id, body);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Wholesale request not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Update wholesale error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update wholesale request" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const { errorResponse } = await requireAuth(req);
  if (errorResponse) return errorResponse;

  const success = DataStore.deleteWholesale(params.id);
  if (!success) {
    return NextResponse.json(
      { success: false, message: "Wholesale request not found" },
      { status: 404 }
    );
  }
  return NextResponse.json({ success: true, message: "Request deleted successfully" });
}
